import { TTrackerConfig } from 'entities/tracker/model/types';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { useEffect } from 'react';
import { trackers } from 'entities/tracker/model/reducers';

export const useGenerateJiraUserState = (tracker: TTrackerConfig) => {
  const dispatch = useAppDispatch();
  const trackerState = useAppSelector(selectTrackers);

  const stateStr = trackerState.userName2State[tracker.username] ?? crypto.randomUUID();

  useEffect(() => {
    dispatch(trackers.actions.setUsernameJiraState({ username: tracker.username, jiraState: stateStr }));
  }, [dispatch, tracker.username, stateStr]);

  return stateStr;
};
