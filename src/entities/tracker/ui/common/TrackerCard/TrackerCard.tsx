import { Modal, Button, Card } from 'antd';
import { PropsWithChildren } from 'react';
import { DeleteOutlined, ExportOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from 'entities/tracker/ui/common/TrackerCard/TrackerCard.module.scss';
import { useMessage } from 'entities/locale/lib/hooks';
import { appPaths } from 'shared/config/constants';

export interface ITrackerCardProps {
  name: string;
  id: string;
  deleteTitle?: string;
  editTitle?: string;
  onEdit(): void;
  onDelete?: () => void;
}

export const TrackerCard = ({
  name,
  onEdit,
  children,
  id,
  onDelete,
  deleteTitle,
  editTitle,
}: PropsWithChildren<ITrackerCardProps>) => {
  const message = useMessage();
  const [modal, contextHolder] = Modal.useModal();

  const confirmDelete = () => {
    modal.confirm({
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
        <Link className={styles.title} href={appPaths.tracker(id)} title={name}>
          {name}
          <ExportOutlined />
        </Link>
      }
      extra={
        <div>
          <Button
            type="text"
            danger
            onClick={confirmDelete}
            icon={<DeleteOutlined />}
            disabled={!onDelete}
            title={deleteTitle}
          />
          <Button type="text" onClick={onEdit} icon={<SettingOutlined />} title={editTitle} />
        </div>
      }
    >
      {children}
      {contextHolder}
    </Card>
  );
};
