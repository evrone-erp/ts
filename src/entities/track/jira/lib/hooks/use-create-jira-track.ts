import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { track } from 'entities/track/common/model/reducers';
import { TTrackFormCreateFields } from 'entities/track/common/ui/TrackFormCreate/types';
import { TTrackerConfig } from 'entities/tracker/model/types';
import { jiraTrackApi } from 'entities/track/jira/model/jira-api';
import { dateToJiraStartedDate } from 'entities/track/jira/lib/dateToJiraStartedDate';
import { isoDurationToSeconds } from 'entities/track/common/lib/iso-duration-to-seconds';
import { humanReadableDurationToISO } from 'entities/track/common/lib/human-readable-duration-to-iso';
import { TJiraCreateTrackParams } from 'entities/track/jira/model/types';

export function useCreateJiraTrack(tracker: TTrackerConfig) {
  const [createTrackMutation, { isLoading: isTrackCreateLoading }] = jiraTrackApi.useCreateJiraTrackMutation();
  const dispatch = useAppDispatch();

  const createTrack = useCallback(
    async ({ start, duration, comment, issueKey }: TTrackFormCreateFields) => {
      const isoDuration = humanReadableDurationToISO(duration);
      if (!isoDuration) {
        return;
      }

      const mutationParams: TJiraCreateTrackParams = {
        issueKey,
        start: dateToJiraStartedDate(start),
        timeSpentSeconds: isoDurationToSeconds(isoDuration) ?? 0,
        tracker,
      };

      if (comment) {
        // Jira's comments are stored in Atlassian Document Format https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/
        // therefore we have to pass this structure for a text comment
        mutationParams.comment = {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: comment,
                },
              ],
            },
          ],
        };
      }

      await createTrackMutation(mutationParams);
      dispatch(track.actions.setInputCreate());
    },
    [tracker, createTrackMutation, dispatch],
  );

  return { isTrackCreateLoading, createTrack };
}
