import { TrackerCard } from 'entities/tracker/ui/common/TrackerCard';
import { TJiraTrackerConfig } from 'entities/tracker/model/types';
import { Typography } from 'antd';
import { useMessage } from 'entities/locale/lib/hooks';

export interface IJiraTrackerCardProps {
  tracker: TJiraTrackerConfig;
  deleteDisabled?: boolean;
  deleteTitle?: string;
  editTitle?: string;
  onEdit(tracker: TJiraTrackerConfig): void;
  onDelete(tracker: TJiraTrackerConfig): void;
}

export const JiraTrackerCard = ({ tracker, onEdit, onDelete, ...rest }: IJiraTrackerCardProps) => {
  const message = useMessage();

  return (
    <TrackerCard
      {...rest}
      name={tracker.name}
      onEdit={() => onEdit(tracker)}
      onDelete={() => onDelete(tracker)}
      id={tracker.id}
    >
      <Typography.Title level={5}>{message('tracker.username')}:</Typography.Title>
      <p>{tracker.username}</p>
      <Typography.Title level={5}>{message('tracker.url')}:</Typography.Title>
      <p>{tracker.url}</p>
    </TrackerCard>
  );
};
