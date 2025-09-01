import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { track } from 'entities/track/common/model/reducers';
import { TTrackInputDelete } from 'entities/track/common/model/types';
import { TTrackerConfig } from 'entities/tracker/model/types';
import { jiraTrackApi } from 'entities/track/jira/model/jira-api';

export function useDeleteJiraTrack(tracker: TTrackerConfig) {
  const dispatch = useAppDispatch();
  const [deleteTrackMutation, { isLoading: isTrackDeleteLoading }] = jiraTrackApi.useDeleteJiraTrackMutation();

  const deleteTrack = useCallback(
    (trackInput: TTrackInputDelete) => {
      deleteTrackMutation({ tracker, ...trackInput });
      dispatch(track.actions.setInputDelete());
    },
    [tracker, deleteTrackMutation, dispatch],
  );

  return { isTrackDeleteLoading, deleteTrack };
}
