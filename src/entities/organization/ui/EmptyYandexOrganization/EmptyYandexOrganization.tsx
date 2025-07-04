import { FC } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';

import { getDefaultTracker } from 'entities/tracker/lib/getDefaultTracker';
import { trackers } from 'entities/tracker/model/reducers';
import styles from './EmptyYandexOrganization.module.scss';

export const EmptyYandexOrganization: FC = () => {
  
  const defaultTracker = getDefaultTracker("7867633", false);
  const dispatch = useAppDispatch();
  dispatch(trackers.actions.upsertTracker({ nextTracker: defaultTracker }));
  dispatch(trackers.actions.setMainTracker({ id: defaultTracker.id }));
  return (
    <div className={styles.container}>
    </div>
  );
};
