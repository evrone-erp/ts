import { api, fetchAllPages, TFetchAllPagesBaseQueryResult } from 'shared/api';
import { transformTracks } from 'entities/track/model/transform-tracks';
import { formatDateAsTrackKey, getTrackDateCacheKey } from 'entities/track/lib/helpers';
import type { PatchCollection } from '@reduxjs/toolkit/src/query/core/buildThunks';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import {
  TCreateTrackParams,
  TGetTracksParams,
  TTrack,
  TTrackInputDelete,
  TTrackInputEdit,
  TTransformedTracks,
} from './types';

export const trackApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTracks: build.query<TTransformedTracks, TGetTracksParams>({
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
        const { from, to, createdBy } = args;
        const allTracks = await fetchAllPages(
          (page) =>
            fetchWithBQ({
              url: `/tracker/v2/worklog/_search`,
              method: 'POST',
              body: {
                start: { from, to },
                createdBy,
              },
              params: { page, perPage: 999 },
            }) as TFetchAllPagesBaseQueryResult<TTrack>,
        );

        if (allTracks.error) {
          return { error: allTracks.error };
        }
        return { data: transformTracks(args, allTracks.data) };
      },
    }),
    create: build.mutation<TTrack, TCreateTrackParams>({
      query: ({ issueKey, ...rest }) => ({
        url: `/tracker/v2/issues/${issueKey}/worklog`,
        method: 'POST',
        body: JSON.stringify(rest),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: newItem } = await queryFulfilled;

          const invalidatedEntries = trackApi.util.selectInvalidatedBy(getState(), [
            { type: 'Track', id: getTrackDateCacheKey(newItem, undefined) },
          ]);

          for (const entry of invalidatedEntries) {
            dispatch(
              trackApi.util.updateQueryData(
                'getTracks',
                entry.originalArgs,
                (draft) => {
                  const nextTrackList = [...draft.list, newItem];
                  return transformTracks(entry.originalArgs, nextTrackList);
                },
                true,
              ),
            );
          }

          // it's easier to just invalidate all tracks loaded in other timezones than to deal with cache
          trackApi.util.invalidateTags([{ type: 'Track', id: 'UTC_OFFSET' }]);
        } catch {
          dispatch(trackApi.util.invalidateTags(['Track']));
        }
      },
    }),
    delete: build.mutation<{}, TTrackInputDelete>({
      query: ({ issueIdOrKey, trackId }) => ({
        url: `/tracker/v2/issues/${issueIdOrKey}/worklog/${trackId}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ trackId }, { dispatch, queryFulfilled, getState }) {
        const invalidatedEntries = trackApi.util.selectInvalidatedBy(getState(), [{ type: 'Track', id: trackId }]);

        const patchResults: PatchCollection[] = [];

        for (const entry of invalidatedEntries) {
          const patch = dispatch(
            trackApi.util.updateQueryData(
              'getTracks',
              entry.originalArgs,
              (draft) => {
                const nextTrackList = draft.list.filter((item) => item.id !== trackId);
                return transformTracks(entry.originalArgs, nextTrackList);
              },
              true,
            ),
          );

          patchResults.push(patch);
        }

        // it's easier to just invalidate all tracks loaded in other timezones than to deal with cache
        trackApi.util.invalidateTags([{ type: 'Track', id: 'UTC_OFFSET' }]);
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((p) => p.undo());
          dispatch(trackApi.util.invalidateTags(['Track']));
        }
      },
    }),
    update: build.mutation<{}, TTrackInputEdit>({
      query: ({ param: { issueIdOrKey, trackId }, form }) => ({
        url: `/tracker/v2/issues/${issueIdOrKey}/worklog/${trackId}`,
        method: 'PATCH',
        body: JSON.stringify(form),
      }),
      async onQueryStarted({ param: { trackId }, form }, { dispatch, queryFulfilled, getState }) {
        const invalidatedTags = [{ type: 'Track' as const, id: trackId.toString() }];
        if (form.start) {
          invalidatedTags.push({
            type: 'Track' as const,
            id: getTrackDateCacheKey(form as { start: string }, undefined),
          });
        }
        const invalidatedEntries = trackApi.util.selectInvalidatedBy(getState(), invalidatedTags);

        const patchResults: PatchCollection[] = [];

        for (const entry of invalidatedEntries) {
          const patch = dispatch(
            trackApi.util.updateQueryData('getTracks', entry.originalArgs, (draft) => {
              const nextTrackList = draft.list.map((item) => {
                if (item.id === trackId) {
                  return { ...item, ...form };
                }
                return item;
              }, true);
              return transformTracks(entry.originalArgs, nextTrackList);
            }),
          );

          patchResults.push(patch);

          // it's easier to just invalidate all tracks loaded in other timezones than to deal with cache
          trackApi.util.invalidateTags([{ type: 'Track', id: 'UTC_OFFSET' }]);
        }
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((p) => p.undo());
          dispatch(trackApi.util.invalidateTags(['Track']));
        }
      },
    }),
  }),
});
