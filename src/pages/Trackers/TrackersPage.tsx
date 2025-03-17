import { TrackerManagement } from 'entities/tracker/ui/common/TrackerManagement/TrackerManagement';
import { LocaleSelector } from 'entities/locale/ui/LocaleSelector';
import { MainTrackerSelector } from 'entities/tracker/ui/common/MainTrackerSelector/MainTrackerSelector';
import { Message } from 'entities/locale/ui/Message';
import { Typography } from 'antd';
import styles from './TrackersPage.module.scss';

export const TrackersPage = () => (
  <main className={styles.trackersPage}>
    <div className={styles.localeSelector}>
      <LocaleSelector />
    </div>

    <Typography.Title level={1} className={styles.title}>
      <Message id="trackers.configuration.title" />
    </Typography.Title>
    <div className={styles.sections}>
      <MainTrackerSelector />
      <TrackerManagement />
    </div>
  </main>
);
