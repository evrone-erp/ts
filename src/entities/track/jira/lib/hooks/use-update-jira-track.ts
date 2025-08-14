import { TTrackInputEditForm } from 'entities/track/common/model/types';
import { useCallback } from 'react';
import { TTrackerConfig } from 'entities/tracker/model/types';
import { jiraTrackApi } from 'entities/track/jira/model/jira-api';
import { dateToJiraStartedDate } from 'entities/track/jira/lib/dateToJiraStartedDate';
import { isoDurationToSeconds } from 'entities/track/common/lib/iso-duration-to-seconds';
import { filterObjectFields } from 'shared/lib/filterObjectFields';

export function useUpdateJiraTrack(tracker: TTrackerConfig) {
  const [startUpdateMutation, { isLoading: isTrackUpdateLoading }] = jiraTrackApi.useUpdateJiraTrackMutation();

  const updateTrack = useCallback(
    (
      { start, duration, comment: commentString }: Partial<TTrackInputEditForm>,
      issueIdOrKey?: string,
      trackId?: number | string,
    ) => {
      if (!trackId || !issueIdOrKey) return;
      debugger;
      const splittedComment = commentString?.split('\n');
      const comment = splittedComment?.length
        ? {
            version: 1,
            type: 'doc',
            content: splittedComment.map((text) => ({
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text,
                },
              ],
            })),
          }
        : undefined;
      startUpdateMutation({
        tracker,
        form: filterObjectFields({
          start: start ? dateToJiraStartedDate(start) : undefined,
          timeSpentSeconds: isoDurationToSeconds(duration),
          comment,
        }),
        param: {
          issueIdOrKey,
          trackId,
        },
      });
    },
    [tracker, startUpdateMutation],
  );

  return { updateTrack, isTrackUpdateLoading };
}
