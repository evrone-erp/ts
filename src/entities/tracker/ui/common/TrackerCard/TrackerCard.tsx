import { Button, Card, Modal } from 'antd';
import { PropsWithChildren } from 'react';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from 'entities/tracker/ui/common/TrackerCard/TrackerCard.module.scss';
import { useMessage } from 'entities/locale/lib/hooks';

export interface ITrackerCardProps {
  name: string;
  id: string;
  deleteDisabled?: boolean;
  deleteTitle?: string;
  editTitle?: string;
  onEdit(): void;
  onDelete(): void;
}

export const TrackerCard = ({
  name,
  onEdit,
  children,
  id,
  onDelete,
  deleteDisabled,
  deleteTitle,
  editTitle,
}: PropsWithChildren<ITrackerCardProps>) => {
  const message = useMessage();

  const confirmDelete = () => {
    Modal.confirm({
      title: message('trackers.configuration.delete', { name }),
      icon: null,
      okText: message('share.yes.action'),
      okType: 'danger',
      cancelText: message('share.cancel.action'),
      onOk: onDelete,
      maskClosable: true,
    });
  };

  return (
    <Card
      className={styles.trackerCard}
      title={
        <Link className={styles.title} href={`/sheet/${id}`} title={name}>
          {name}
        </Link>
      }
      extra={
        <div>
          <Button
            type="text"
            danger
            onClick={confirmDelete}
            icon={<DeleteOutlined />}
            disabled={deleteDisabled}
            title={deleteTitle}
          />
          <Button type="text" onClick={onEdit} icon={<SettingOutlined />} title={editTitle} />
        </div>
      }
    >
      {children}
    </Card>
  );
};
