import { Button, Space, Typography } from 'antd';
import { TTrackerConfig, TYandexTrackerConfig } from 'entities/tracker/model/types';
import { useAppDispatch } from 'shared/lib/hooks';
import { trackers } from 'entities/tracker/model/reducers';
import { useMemo, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { YandexTrackerForm } from 'entities/tracker/ui/yandex/YandexTrackerForm/YandexTrackerForm';
import { Message } from 'entities/locale/ui/Message';
import { useMessage } from 'entities/locale/lib/hooks';
import { useRouter } from 'next/router';
import { TrackerCardPlaceholder } from 'entities/tracker/ui/common/TrackerCardPlaceholder/TrackerCardPlaceholder';
import { TrackerCard } from 'entities/tracker/ui/common/TrackerCard';
import { YandexCloud } from 'components/Icons/YandexCloud';
import { Yandex360 } from 'components/Icons/Yandex360';
import styles from './YandexTrackerManagement.module.scss';

interface IYandexTrackerManagementProps {
  yandexTrackers: TYandexTrackerConfig[];
  getOnDeleteTracker: (tracker: TTrackerConfig) => (() => void) | undefined;
  getDeleteBtnTitle: (id: string) => string;
}

export const YandexTrackerManagement = ({
  yandexTrackers,
  getOnDeleteTracker,
  getDeleteBtnTitle,
}: IYandexTrackerManagementProps) => {
  const message = useMessage();
  const router = useRouter();
  const { editId } = router.query;
  const trackerToEdit = yandexTrackers.find(({ id }) => editId === id);

  const [isFormOpen, setIsFormOpen] = useState(!!trackerToEdit);
  const [editingTracker, setEditingTracker] = useState<TYandexTrackerConfig | null>(trackerToEdit || null);

  const dispatch = useAppDispatch();

  const onNewTracker = () => {
    setIsFormOpen(true);
  };

  const onEditTracker = (tracker: TYandexTrackerConfig) => {
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

  const stateTrackerIds = useMemo(() => yandexTrackers.map((tracker) => tracker.id), [yandexTrackers]);

  return (
    <section>
      <div className={styles.trackersHeader}>
        <Typography.Title level={2}>
          <Message id="trackers.configuration.yandex.name" />
        </Typography.Title>
        <Button
          type="text"
          icon={<PlusCircleOutlined />}
          onClick={onNewTracker}
          title={message('tracker.yandex.new')}
        />
      </div>
      <Space className={styles.trackersContainer}>
        {yandexTrackers.length > 0 ? (
          yandexTrackers.map((tracker) => {
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
                <Typography.Title level={5}>{message('tracker.yandex.orgType')}:</Typography.Title>
                {tracker.isCloud ? (
                  <p>
                    <YandexCloud /> {message('tracker.yandex.orgType.cloud.name')}
                  </p>
                ) : (
                  <p>
                    <Yandex360 /> {message('tracker.yandex.orgType.360.name')}
                  </p>
                )}
                <Typography.Title level={5}>{message('tracker.yandex.orgId')}:</Typography.Title>
                <p>{tracker.orgId}</p>
                <Typography.Title level={5}>{message('tracker.username')}:</Typography.Title>
                <p>{tracker.username}</p>
              </TrackerCard>
            );
          })
        ) : (
          <TrackerCardPlaceholder onCreateClick={onNewTracker} />
        )}
      </Space>

      <YandexTrackerForm
        open={isFormOpen}
        tracker={editingTracker ?? undefined}
        saveTracker={onSaveTracker}
        existingTrackerIds={stateTrackerIds}
        onCancel={closeModal}
      />
    </section>
  );
};
