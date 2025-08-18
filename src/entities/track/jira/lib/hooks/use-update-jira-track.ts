import { TTrackInputEditForm } from 'entities/track/common/model/types';
import { useCallback } from 'react';
import { TTrackerConfig } from 'entities/tracker/model/types';
import { jiraTrackApi } from 'entities/track/jira/model/jira-api';
import { dateToJiraStartedDate } from 'entities/track/jira/lib/dateToJiraStartedDate';
import { isoDurationToSeconds } from 'entities/track/common/lib/iso-duration-to-seconds';
import { filterObjectFields } from 'shared/lib/filterObjectFields';
import { formatJiraComment } from 'entities/track/jira/model/format-jira-comment';

export function useUpdateJiraTrack(tracker: TTrackerConfig) {
  const [startUpdateMutation, { isLoading: isTrackUpdateLoading }] = jiraTrackApi.useUpdateJiraTrackMutation();

  const updateTrack = useCallback(
    ({ start, duration, comment }: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string) => {
      if (!trackId || !issueIdOrKey) return undefined;
      return startUpdateMutation({
        tracker,
        form: filterObjectFields({
          start: start ? dateToJiraStartedDate(start) : undefined,
          timeSpentSeconds: isoDurationToSeconds(duration),
          comment: formatJiraComment(comment),
        }),
        param: {
          issueIdOrKey,
          trackId,
        },
      })
        .unwrap()
        .catch((res) => {
          throw new Error(res.data.errorMessages.join('\n'));
        });
    },
    [tracker, startUpdateMutation],
  );

  return { updateTrack, isTrackUpdateLoading };
}
