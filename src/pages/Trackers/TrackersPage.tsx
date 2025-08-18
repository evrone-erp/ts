import { CloseOutlined } from '@ant-design/icons';
import { LocaleSelector } from 'entities/locale/ui/LocaleSelector';
import { MainTrackerSelector } from 'entities/tracker/ui/common/MainTrackerSelector/MainTrackerSelector';
import { Message } from 'entities/locale/ui/Message';
import { Flex, Typography } from 'antd';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';
import { appPaths } from 'shared/config/constants';
import { JiraTrackerManagement } from 'entities/tracker/ui/common/JiraTrackerManagement/JiraTrackerManagement';
import { YandexTrackerManagement } from 'entities/tracker/ui/common/YandexTrackerManagement/YandexTrackerManagement';
import {
  isJiraTrackerCfg,
  isYandexTrackerCfg,
  TJiraTrackerConfig,
  TTrackerConfig,
  TYandexTrackerConfig,
} from 'entities/tracker/model/types';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { useMessage } from 'entities/locale/lib/hooks';
import { trackers } from 'entities/tracker/model/reducers';
import { TAppConfig } from 'shared/lib/types';
import styles from './TrackersPage.module.scss';

export const TrackersPage = ({ isYandexTrackerEnabled, isJiraEnabled }: TAppConfig) => {
  const message = useMessage();
  const trackersState = useAppSelector(selectTrackers);
  const dispatch = useAppDispatch();

  const { trackers: stateTrackers, ids: stateTrackerIds, mainTrackerId } = trackersState;
  const onlyOneTracker = stateTrackerIds.length === 1;

  const { jiraTrackers, yandexTrackers } = useMemo(
    () =>
      stateTrackerIds.reduce<{
        jiraTrackers: TJiraTrackerConfig[];
        yandexTrackers: TYandexTrackerConfig[];
      }>(
        (acc, jId) => {
          const tracker = stateTrackers[jId];
          if (isJiraEnabled && isJiraTrackerCfg(tracker)) {
            acc.jiraTrackers.push(tracker);
          }
          if (isYandexTrackerEnabled && isYandexTrackerCfg(tracker)) {
            acc.yandexTrackers.push(tracker);
          }
          return acc;
        },
        { jiraTrackers: [], yandexTrackers: [] },
      ),
    [isJiraEnabled, isYandexTrackerEnabled, stateTrackerIds, stateTrackers],
  );

  const getDeleteBtnTitle = useCallback(
    (id: string) => {
      if (onlyOneTracker) {
        return message('trackers.configuration.delete.disabled.one.tooltip');
      }
      if (mainTrackerId === id) {
        return message('trackers.configuration.delete.disabled.main.tooltip');
      }
      return message('trackers.configuration.delete.tooltip');
    },
    [mainTrackerId, message, onlyOneTracker],
  );

  const getOnDeleteTracker = useCallback(
    (tracker: TTrackerConfig) => {
      if (onlyOneTracker || mainTrackerId === tracker.id) {
        return undefined;
      }
      return () => {
        dispatch(trackers.actions.deleteTracker(tracker));
      };
    },
    [dispatch, mainTrackerId, onlyOneTracker],
  );

  const filteredTrackers = useMemo(() => [...jiraTrackers, ...yandexTrackers], [jiraTrackers, yandexTrackers]);

  return (
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
        <MainTrackerSelector filteredTrackers={filteredTrackers} />
        {isYandexTrackerEnabled && (
          <YandexTrackerManagement
            yandexTrackers={yandexTrackers}
            getDeleteBtnTitle={getDeleteBtnTitle}
            getOnDeleteTracker={getOnDeleteTracker}
          />
        )}
        {isJiraEnabled && (
          <JiraTrackerManagement
            jiraTrackers={jiraTrackers}
            getDeleteBtnTitle={getDeleteBtnTitle}
            getOnDeleteTracker={getOnDeleteTracker}
          />
        )}
      </div>
    </main>
  );
};
