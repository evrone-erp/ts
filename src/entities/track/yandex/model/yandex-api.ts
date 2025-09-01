import { api, fetchAllPages, TFetchAllPagesBaseQueryResult } from 'shared/api';
import { trackListToMaps } from 'entities/track/common/model/track-list-to-maps';
import { formatDateAsTrackKey, getTrackDateCacheKey } from 'entities/track/common/lib/helpers';
import type { PatchCollection } from '@reduxjs/toolkit/src/query/core/buildThunks';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { identity } from 'shared/lib/utils';
import { TDeleteTrackParams, TTransformedTracks } from 'entities/track/common/model/types';
import {
  TYandexCreateTrackParams,
  TYandexEditTrackParams,
  TYandexGetTracksParams,
  TYandexTrack,
} from 'entities/track/yandex/model/types';
import { yandexTransformTrack, yandexTransformTracks } from 'entities/track/yandex/model/yandex-transform-tracks';
import { getTrackerHeaders } from 'entities/tracker/lib/getTrackerHeaders';
import { yandexTrackEndpoints } from 'entities/track/yandex/model/endpoints';

export const yandexTrackApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getYandexTracks: build.query<TTransformedTracks, TYandexGetTracksParams>({
      providesTags(tracks, _, { from, to, utcOffsetInMinutes }) {
        const tags = tracks ? tracks.list.map((t) => ({ type: 'Track' as const, id: t.id.toString() })) : [];

        /*
          it's important to add dates as tags!
          later, when we create track, we will be able to call trackApi.util.selectInvalidatedBy() and update all queries,
          that need to be updated with created track
         */
        const dateRange = DateWrapper.getDateRange(
          DateWrapper.getDate({ date: from, utcOffsetInMinutes }),
          DateWrapper.getDate({ date: to, utcOffsetInMinutes }),
          'day',
        );
        for (const date of dateRange) {
          tags.push({
            type: 'Track' as const,
            id: formatDateAsTrackKey(date),
          });
        }

        // if we are loading tracks in selected time zone, then it's much easier to invalidate all queries in mutations
        if (utcOffsetInMinutes !== undefined) {
          tags.push({
            type: 'Track' as const,
            id: 'UTC_OFFSET',
          });
        }

        return tags;
      },
      async queryFn(args, _, __, fetchWithBQ) {
        const { from, to, createdBy, tracker } = args;
        const allTracks = await fetchAllPages<TYandexTrack[], TYandexTrack>(
          (page) =>
            fetchWithBQ({
              url: yandexTrackEndpoints.tracks,
              method: 'POST',
              body: {
                start: { from, to },
                createdBy,
              },
              params: { page, perPage: 999 },
              headers: getTrackerHeaders(tracker),
            }) as TFetchAllPagesBaseQueryResult<TYandexTrack[]>,
          identity,
        );

        if (allTracks.error) {
          return { error: allTracks.error };
        }
        return { data: trackListToMaps(args, yandexTransformTracks(allTracks.data)) };
      },
    }),
    createYandexTrack: build.mutation<TYandexTrack, TYandexCreateTrackParams>({
      query: ({ issueKey, tracker, ...rest }) => ({
        url: yandexTrackEndpoints.issueTracks(issueKey),
        method: 'POST',
        body: JSON.stringify(rest),
        headers: getTrackerHeaders(tracker),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: newItem } = await queryFulfilled;

          const invalidatedEntries = yandexTrackApi.util.selectInvalidatedBy(getState(), [
            { type: 'Track', id: getTrackDateCacheKey(newItem, undefined) },
          ]);

          for (const entry of invalidatedEntries) {
            dispatch(
              yandexTrackApi.util.updateQueryData(
                'getYandexTracks',
                entry.originalArgs,
                (draft) => {
                  const nextTrackList = [...draft.list, yandexTransformTrack(newItem)];
                  return trackListToMaps(entry.originalArgs, nextTrackList);
                },
                true,
              ),
            );
          }

          // it's easier to just invalidate all tracks loaded in other timezones than to deal with cache
          yandexTrackApi.util.invalidateTags([{ type: 'Track', id: 'UTC_OFFSET' }]);
        } catch {
          dispatch(yandexTrackApi.util.invalidateTags(['Track']));
        }
      },
    }),
    deleteYandexTrack: build.mutation<{}, TDeleteTrackParams>({
      query: ({ issueIdOrKey, trackId, tracker }) => ({
        url: yandexTrackEndpoints.track(issueIdOrKey, trackId),
        method: 'DELETE',
        headers: getTrackerHeaders(tracker),
      }),
      async onQueryStarted({ trackId }, { dispatch, queryFulfilled, getState }) {
        const invalidatedEntries = yandexTrackApi.util.selectInvalidatedBy(getState(), [
          { type: 'Track', id: trackId },
        ]);

        const patchResults: PatchCollection[] = [];

        for (const entry of invalidatedEntries) {
          const patch = dispatch(
            yandexTrackApi.util.updateQueryData(
              'getYandexTracks',
              entry.originalArgs,
              (draft) => {
                const nextTrackList = draft.list.filter((item) => item.id !== trackId);
                return trackListToMaps(entry.originalArgs, nextTrackList);
              },
              true,
            ),
          );

          patchResults.push(patch);
        }

        // it's easier to just invalidate all tracks loaded in other timezones than to deal with cache
        yandexTrackApi.util.invalidateTags([{ type: 'Track', id: 'UTC_OFFSET' }]);
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((p) => p.undo());
          dispatch(yandexTrackApi.util.invalidateTags(['Track']));
        }
      },
    }),
    updateYandexTrack: build.mutation<{}, TYandexEditTrackParams>({
      query: ({ param: { issueIdOrKey, trackId }, form, tracker }) => ({
        url: yandexTrackEndpoints.track(issueIdOrKey, trackId),
        method: 'PATCH',
        body: JSON.stringify(form),
        headers: getTrackerHeaders(tracker),
      }),
      async onQueryStarted({ param: { trackId }, form }, { dispatch, queryFulfilled, getState }) {
        const invalidatedTags = [{ type: 'Track' as const, id: trackId.toString() }];
        if (form.start) {
          invalidatedTags.push({
            type: 'Track' as const,
            id: getTrackDateCacheKey(form as { start: string }, undefined),
          });
        }
        const invalidatedEntries = yandexTrackApi.util.selectInvalidatedBy(getState(), invalidatedTags);

        const patchResults: PatchCollection[] = [];

        for (const entry of invalidatedEntries) {
          const patch = dispatch(
            yandexTrackApi.util.updateQueryData('getYandexTracks', entry.originalArgs, (draft) => {
              const nextTrackList = draft.list.map((item) => {
                if (item.id === trackId) {
                  return { ...item, ...form };
                }
                return item;
              }, true);
              return trackListToMaps(entry.originalArgs, nextTrackList);
            }),
          );

          patchResults.push(patch);

          // it's easier to just invalidate all tracks loaded in other timezones than to deal with cache
          yandexTrackApi.util.invalidateTags([{ type: 'Track', id: 'UTC_OFFSET' }]);
        }
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((p) => p.undo());
          dispatch(yandexTrackApi.util.invalidateTags(['Track']));
        }
      },
    }),
  }),
});
