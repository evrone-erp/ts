import { CloseOutlined } from '@ant-design/icons';
import { LocaleSelector } from 'entities/locale/ui/LocaleSelector';
import { MainTrackerSelector } from 'entities/tracker/ui/common/MainTrackerSelector/MainTrackerSelector';
import { Message } from 'entities/locale/ui/Message';
import { Flex, Typography } from 'antd';
import Link from 'next/link';
import { appPaths } from 'shared/config/constants';
import { JiraTrackerManagement } from 'entities/tracker/ui/common/JiraTrackerManagement/JiraTrackerManagement';
import { YandexTrackerManagement } from 'entities/tracker/ui/common/YandexTrackerManagement/YandexTrackerManagement';
import styles from './TrackersPage.module.scss';

export const TrackersPage = ({ isYandexTrackerEnabled, isJiraEnabled }: TTrackersPageProps) => (
  <main className={styles.trackersPage}>
    <Flex gap="small" align="center" className={styles.titleWrapper}>
      <Typography.Title level={1} className={styles.title}>
        <Message id="trackers.configuration.title" />
      </Typography.Title>
      <Link className={styles.closeIcon} type="text" href={appPaths.home}>
        <CloseOutlined />
      </Link>
      <LocaleSelector />
    </Flex>
    <div className={styles.sections}>
      <MainTrackerSelector />
      {isYandexTrackerEnabled && <YandexTrackerManagement />}
      {isJiraEnabled && <JiraTrackerManagement />}
    </div>
  </main>
);

export type TTrackersPageProps = {
  isYandexTrackerEnabled: boolean;
  isJiraEnabled: boolean;
};
