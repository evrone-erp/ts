import { TTrackerConfig } from 'entities/tracker/model/types';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { trackers } from 'entities/tracker/model/reducers';

export const useSetTrackerUsername = (tracker: TTrackerConfig, username: string | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (username) {
      dispatch(trackers.actions.setUsername({ id: tracker.id, username }));
    }
  }, [tracker, username, dispatch]);
};
