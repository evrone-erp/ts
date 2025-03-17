import { Button, Space, Typography } from 'antd';
import {
  isJiraTrackerCfg,
  isYandexTrackerCfg,
  TJiraTrackerConfig,
  Tracker,
  TTrackerConfig,
  TYandexTrackerConfig,
} from 'entities/tracker/model/types';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { trackers } from 'entities/tracker/model/reducers';
import { useState } from 'react';
import { YandexTrackerCard } from 'entities/tracker/ui/yandex/YandexTrackerCard/YandexTrackerCard';
import { JiraTrackerCard } from 'entities/tracker/ui/jira/JiraTrackerCard/JiraTrackerCard';
import { JiraTrackerForm } from 'entities/tracker/ui/jira/JiraTrackerForm/JiraTrackerForm';
import { PlusCircleOutlined } from '@ant-design/icons';
import { YandexTrackerForm } from 'entities/tracker/ui/yandex/YandexTrackerForm/YandexTrackerForm';
import styles from 'entities/tracker/ui/common/TrackerManagement/TrackerManagement.module.scss';
import { Message } from 'entities/locale/ui/Message';
import { useMessage } from 'entities/locale/lib/hooks';
import { useRouter } from 'next/router';
import { getTracker } from 'entities/tracker/lib/getTracker';

export const TrackerManagement = () => {
  const message = useMessage();
  const router = useRouter();
  const { editId } = router.query;

  const trackersState = useAppSelector(selectTrackers);

  const trackerToEdit = getTracker(trackersState, editId as string);

  const [isJiraTrackFormOpen, setIsJiraTrackFormOpen] = useState(trackerToEdit?.type === Tracker.Jira);
  const [editingJiraTracker, setEditingJiraTracker] = useState<TJiraTrackerConfig | null>(
    isJiraTrackerCfg(trackerToEdit) ? trackerToEdit : null,
  );

  const [isYandexTrackFormOpen, setIsYandexTrackFormOpen] = useState(trackerToEdit?.type === Tracker.Yandex);
  const [editingYandexTracker, setEditingYandexTracker] = useState<TYandexTrackerConfig | null>(
    isYandexTrackerCfg(trackerToEdit) ? trackerToEdit : null,
  );

  const dispatch = useAppDispatch();
  const { trackers: stateTrackers, ids: stateTrackerIds, mainTrackerId } = trackersState;

  const onlyOneTracker = stateTrackerIds.length === 1;

  const getDeleteBtnTitle = (id: string) => {
    if (onlyOneTracker) {
      return message('trackers.configuration.delete.disabled.one.tooltip');
    }
    if (mainTrackerId === id) {
      return message('trackers.configuration.delete.disabled.main.tooltip');
    }
    return message('trackers.configuration.delete.tooltip');
  };

  const onNewJiraTracker = () => {
    setIsJiraTrackFormOpen(true);
  };

  const onEditJiraTracker = (tracker: TJiraTrackerConfig) => {
    setEditingJiraTracker(tracker);
    setIsJiraTrackFormOpen(true);
  };

  const onNewYandexTracker = () => {
    setIsYandexTrackFormOpen(true);
  };

  const onEditYandexTracker = (tracker: TYandexTrackerConfig) => {
    setEditingYandexTracker(tracker);
    setIsYandexTrackFormOpen(true);
  };

  const closeModals = () => {
    setEditingJiraTracker(null);
    setIsJiraTrackFormOpen(false);

    setEditingYandexTracker(null);
    setIsYandexTrackFormOpen(false);
  };

  const onSaveTracker = (nextTracker: TTrackerConfig, prevTracker?: TTrackerConfig) => {
    dispatch(trackers.actions.upsertTracker({ nextTracker, prevTracker }));
    closeModals();
  };

  const onDeleteTracker = (tracker: TTrackerConfig) => {
    dispatch(trackers.actions.deleteTracker(tracker));
  };

  return (
    <section>
      <div className={styles.trackersHeader}>
        <Typography.Title level={2}>
          <Message id="trackers.configuration.yandex.name" />
        </Typography.Title>
        <Button
          type="text"
          icon={<PlusCircleOutlined />}
          onClick={onNewYandexTracker}
          title={message('tracker.yandex.new')}
        />
      </div>
      <Space className={styles.trackersContainer}>
        {stateTrackerIds.map((yId) => {
          const tracker = stateTrackers[yId];
          if (!isYandexTrackerCfg(tracker)) {
            return null;
          }
          return (
            <YandexTrackerCard
              onDelete={onDeleteTracker}
              onEdit={onEditYandexTracker}
              key={yId}
              tracker={tracker}
              deleteDisabled={onlyOneTracker || mainTrackerId === yId}
              deleteTitle={getDeleteBtnTitle(yId)}
              editTitle={message('trackers.configuration.editTracker.tooltip')}
            />
          );
        })}
      </Space>

      <div className={styles.trackersHeader}>
        <Typography.Title level={2}>
          <Message id="trackers.configuration.jira.name" />
        </Typography.Title>
        <Button
          type="text"
          icon={<PlusCircleOutlined />}
          onClick={onNewJiraTracker}
          title={message('tracker.jira.new')}
        />
      </div>
      <Space className={styles.trackersContainer}>
        {stateTrackerIds.map((jId) => {
          const tracker = stateTrackers[jId];
          if (!isJiraTrackerCfg(tracker)) {
            return null;
          }
          return (
            <JiraTrackerCard
              onDelete={onDeleteTracker}
              key={jId}
              tracker={tracker}
              onEdit={onEditJiraTracker}
              deleteDisabled={onlyOneTracker || mainTrackerId === jId}
              deleteTitle={getDeleteBtnTitle(jId)}
              editTitle={message('trackers.configuration.editTracker.tooltip')}
            />
          );
        })}
      </Space>

      <JiraTrackerForm
        open={isJiraTrackFormOpen}
        tracker={editingJiraTracker ?? undefined}
        saveTracker={onSaveTracker}
        existingTrackerIds={stateTrackerIds}
        onCancel={closeModals}
      />

      <YandexTrackerForm
        open={isYandexTrackFormOpen}
        tracker={editingYandexTracker ?? undefined}
        saveTracker={onSaveTracker}
        existingTrackerIds={stateTrackerIds}
        onCancel={closeModals}
      />
    </section>
  );
};
