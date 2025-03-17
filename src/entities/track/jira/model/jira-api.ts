import { api, fetchAllPages, getTotalPagesJira, TFetchAllPagesBaseQueryResult } from 'shared/api';

import { formatDateAsTrackKey, getTrackDateCacheKey } from 'entities/track/common/lib/helpers';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { TDeleteTrackParams, TTransformedTracks } from 'entities/track/common/model/types';
import {
  TJiraCreateTrackParams,
  TJiraEditTrackParams,
  TJiraGetTracksParams,
  TJiraTrack,
  TJiraTracksResponse,
} from 'entities/track/jira/model/types';
import { getTrackerHeaders } from 'entities/tracker/lib/getTrackerHeaders';
import { trackListToMaps } from 'entities/track/common/model/track-list-to-maps';
import { jiraTransformTrack, jiraTransformTracks } from 'entities/track/jira/model/jira-transform-tracks';
import { batchPromises } from 'shared/lib/batch-promises';
import { jiraTrackEndpoints } from 'entities/track/jira/model/endpoints';
import { PatchCollection } from '@reduxjs/toolkit/src/query/core/buildThunks';
import { jiraTrackUpdateFormToTrackParts } from 'entities/track/jira/model/jiraTrackUpdateFormToTrackParts';

export const jiraTrackApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getJiraTracks: build.query<TTransformedTracks, TJiraGetTracksParams>({
      providesTags(tracks, _, { from, to, utcOffsetInMinutes }) {
        const tags = tracks ? tracks.list.map((t) => ({ type: 'JiraTrack' as const, id: t.id.toString() })) : [];

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
            type: 'JiraTrack' as const,
            id: formatDateAsTrackKey(date),
          });
        }

        // if we are loading tracks in selected time zone, then it's much easier to invalidate all queries in mutations
        if (utcOffsetInMinutes !== undefined) {
          tags.push({
            type: 'JiraTrack' as const,
            id: 'UTC_OFFSET',
          });
        }

        return tags;
      },
      async queryFn(args, _, __, fetchWithBQ) {
        const { fromTimestamp, toTimestamp, issueKeyList, tracker } = args;

        const loadIssueWorklogs = async (issueKey: string) =>
          fetchAllPages(
            (page) =>
              fetchWithBQ({
                url: jiraTrackEndpoints.issueTracks(issueKey),
                method: 'GET',
                params: {
                  startAt: (page - 1) * 5000,
                  maxResults: 5000,
                  startedAfter: fromTimestamp,
                  startedBefore: toTimestamp,
                },
                headers: getTrackerHeaders(tracker),
              }) as TFetchAllPagesBaseQueryResult<TJiraTracksResponse>,
            ({ worklogs }) => worklogs,
            getTotalPagesJira,
          );

        const allWorklogs = await batchPromises(issueKeyList, 1, async (issueKey) => {
          const worklogs = await loadIssueWorklogs(issueKey);
          if (worklogs.error) {
            throw new Error('Error during track loading');
          }
          return jiraTransformTracks(worklogs.data, issueKey);
        });

        return { data: trackListToMaps({ ...args }, allWorklogs.flat()) };
      },
    }),
    createJiraTrack: build.mutation<TJiraTrack, TJiraCreateTrackParams>({
      query: ({ issueKey, tracker, timeSpentSeconds, start, comment }) => ({
        url: jiraTrackEndpoints.issueTracks(issueKey),
        method: 'POST',
        body: JSON.stringify({
          started: start,
          timeSpentSeconds,
          comment,
        }),
        headers: getTrackerHeaders(tracker),
      }),
      async onQueryStarted({ issueKey }, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const newItem = jiraTransformTrack(data, issueKey);

          const invalidatedEntries = jiraTrackApi.util
            .selectInvalidatedBy(getState(), [{ type: 'JiraTrack', id: getTrackDateCacheKey(newItem, undefined) }])
            .filter(({ originalArgs }) => (originalArgs as TJiraGetTracksParams).issueKeyList.includes(issueKey));

          for (const entry of invalidatedEntries) {
            dispatch(
              jiraTrackApi.util.updateQueryData(
                'getJiraTracks',
                entry.originalArgs,
                (draft) => {
                  const nextTrackList = [...draft.list, newItem];
                  return trackListToMaps(entry.originalArgs, nextTrackList);
                },
                true,
              ),
            );
          }

          // it's easier to just invalidate all tracks loaded in other timezones than to deal with cache
          jiraTrackApi.util.invalidateTags([{ type: 'JiraTrack', id: 'UTC_OFFSET' }]);
        } catch {
          dispatch(jiraTrackApi.util.invalidateTags(['JiraTrack']));
        }
      },
    }),
    deleteJiraTrack: build.mutation<{}, TDeleteTrackParams>({
      query: ({ issueIdOrKey, trackId, tracker }) => ({
        url: jiraTrackEndpoints.track(issueIdOrKey, trackId),
        method: 'DELETE',
        headers: getTrackerHeaders(tracker),
      }),
      async onQueryStarted({ trackId }, { dispatch, queryFulfilled, getState }) {
        const invalidatedEntries = jiraTrackApi.util.selectInvalidatedBy(getState(), [
          { type: 'JiraTrack', id: trackId },
        ]);

        const patchResults: PatchCollection[] = [];

        for (const entry of invalidatedEntries) {
          const patch = dispatch(
            jiraTrackApi.util.updateQueryData(
              'getJiraTracks',
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
        jiraTrackApi.util.invalidateTags([{ type: 'JiraTrack', id: 'UTC_OFFSET' }]);
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((p) => p.undo());
          dispatch(jiraTrackApi.util.invalidateTags(['JiraTrack']));
        }
      },
    }),
    updateJiraTrack: build.mutation<{}, TJiraEditTrackParams>({
      query: ({ param: { issueIdOrKey, trackId }, form: { start, timeSpentSeconds, comment }, tracker }) => ({
        url: jiraTrackEndpoints.track(issueIdOrKey, trackId),
        method: 'PUT',
        body: JSON.stringify({
          started: start,
          timeSpentSeconds,
          comment,
        }),
        headers: getTrackerHeaders(tracker),
      }),
      async onQueryStarted({ param: { trackId }, form }, { dispatch, queryFulfilled, getState }) {
        const invalidatedTags = [{ type: 'JiraTrack' as const, id: trackId.toString() }];
        if (form.start) {
          invalidatedTags.push({
            type: 'JiraTrack' as const,
            id: getTrackDateCacheKey({ start: form.start }, undefined),
          });
        }
        const invalidatedEntries = jiraTrackApi.util.selectInvalidatedBy(getState(), invalidatedTags);

        const patchResults: PatchCollection[] = [];

        for (const entry of invalidatedEntries) {
          const patch = dispatch(
            jiraTrackApi.util.updateQueryData('getJiraTracks', entry.originalArgs, (draft) => {
              const nextTrackList = draft.list.map((item) => {
                if (item.id === trackId) {
                  return { ...item, ...jiraTrackUpdateFormToTrackParts(form) };
                }
                return item;
              }, true);
              return trackListToMaps(entry.originalArgs, nextTrackList);
            }),
          );

          patchResults.push(patch);

          // it's easier to just invalidate all tracks loaded in other timezones than to deal with cache
          jiraTrackApi.util.invalidateTags([{ type: 'JiraTrack', id: 'UTC_OFFSET' }]);
        }
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((p) => p.undo());
          dispatch(jiraTrackApi.util.invalidateTags(['JiraTrack']));
        }
      },
    }),
  }),
});
