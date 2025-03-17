import { TrackerCard } from 'entities/tracker/ui/common/TrackerCard';
import { TYandexTrackerConfig } from 'entities/tracker/model/types';
import { Typography } from 'antd';
import { useMessage } from 'entities/locale/lib/hooks';
import { YandexCloud } from 'components/Icons/YandexCloud';
import { Yandex360 } from 'components/Icons/Yandex360';

export interface IYandexTrackerCardProps {
  tracker: TYandexTrackerConfig;
  deleteDisabled?: boolean;
  deleteTitle?: string;
  editTitle?: string;
  onEdit(tracker: TYandexTrackerConfig): void;
  onDelete(tracker: TYandexTrackerConfig): void;
}

export const YandexTrackerCard = ({ tracker, onEdit, onDelete, ...rest }: IYandexTrackerCardProps) => {
  const message = useMessage();

  return (
    <TrackerCard
      {...rest}
      name={tracker.name}
      onEdit={() => onEdit(tracker)}
      onDelete={() => onDelete(tracker)}
      id={tracker.id}
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
};
