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
    ({ start, duration }: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string) => {
      if (!trackId || !issueIdOrKey) return;
      startUpdateMutation({
        tracker,
        form: filterObjectFields({
          start: start ? dateToJiraStartedDate(start) : undefined,
          timeSpentSeconds: isoDurationToSeconds(duration),
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
