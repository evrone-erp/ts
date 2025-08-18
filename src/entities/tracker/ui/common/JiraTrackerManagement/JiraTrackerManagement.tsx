import { Button, Space, Typography } from 'antd';
import { TJiraTrackerConfig, TTrackerConfig } from 'entities/tracker/model/types';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'shared/lib/hooks';
import { trackers } from 'entities/tracker/model/reducers';
import { TrackerCard } from 'entities/tracker/ui/common/TrackerCard';
import { useMemo, useState } from 'react';
import { JiraTrackerForm } from 'entities/tracker/ui/jira/JiraTrackerForm/JiraTrackerForm';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Message } from 'entities/locale/ui/Message';
import { TrackerCardPlaceholder } from 'entities/tracker/ui/common/TrackerCardPlaceholder/TrackerCardPlaceholder';
import { useMessage } from 'entities/locale/lib/hooks';
import styles from './JiraTrackerManagement.module.scss';

interface IJiraTrackerManagementProps {
  jiraTrackers: TJiraTrackerConfig[];
  getOnDeleteTracker: (tracker: TTrackerConfig) => (() => void) | undefined;
  getDeleteBtnTitle: (id: string) => string;
}

export const JiraTrackerManagement = ({
  jiraTrackers,
  getOnDeleteTracker,
  getDeleteBtnTitle,
}: IJiraTrackerManagementProps) => {
  const message = useMessage();
  const router = useRouter();
  const { editId } = router.query;
  const trackerToEdit = jiraTrackers.find(({ id }) => editId === id);
  const [isFormOpen, setIsFormOpen] = useState(!!trackerToEdit);
  const [editingTracker, setEditingTracker] = useState<TJiraTrackerConfig | null>(trackerToEdit || null);

  const dispatch = useAppDispatch();

  const onNewTracker = () => {
    setIsFormOpen(true);
  };

  const onEditTracker = (tracker: TJiraTrackerConfig) => {
    setEditingTracker(tracker);
    setIsFormOpen(true);
  };

  const closeModal = () => {
    setEditingTracker(null);
    setIsFormOpen(false);
  };

  const onSaveTracker = (nextTracker: TTrackerConfig, prevTracker?: TTrackerConfig) => {
    dispatch(trackers.actions.upsertTracker({ nextTracker, prevTracker }));
    closeModal();
  };

  const stateTrackerIds = useMemo(() => jiraTrackers.map((tracker) => tracker.id), [jiraTrackers]);

  return (
    <section>
      <div className={styles.trackersHeader}>
        <Typography.Title level={2}>
          <Message id="trackers.configuration.jira.name" />
        </Typography.Title>
        <Button type="text" icon={<PlusCircleOutlined />} onClick={onNewTracker} title={message('tracker.jira.new')} />
      </div>
      <Space className={styles.trackersContainer}>
        {jiraTrackers.length > 0 ? (
          jiraTrackers.map((tracker) => {
            const onDelete = getOnDeleteTracker(tracker);
            return (
              <TrackerCard
                deleteTitle={getDeleteBtnTitle(tracker.id)}
                editTitle={message('trackers.configuration.editTracker.tooltip')}
                name={tracker.name}
                onEdit={() => onEditTracker(tracker)}
                onDelete={onDelete}
                id={tracker.id}
                key={tracker.id}
              >
                <Typography.Title level={5}>{message('tracker.username')}:</Typography.Title>
                <p>{tracker.username}</p>
                <Typography.Title level={5}>{message('tracker.url')}:</Typography.Title>
                <p>{tracker.url}</p>
              </TrackerCard>
            );
          })
        ) : (
          <TrackerCardPlaceholder onCreateClick={onNewTracker} />
        )}
      </Space>

      <JiraTrackerForm
        open={isFormOpen}
        tracker={editingTracker ?? undefined}
        saveTracker={onSaveTracker}
        existingTrackerIds={stateTrackerIds}
        onCancel={closeModal}
      />
    </section>
  );
};
