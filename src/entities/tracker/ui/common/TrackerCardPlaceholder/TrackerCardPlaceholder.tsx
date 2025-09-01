import { Button, Card, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMessage } from 'entities/locale/lib/hooks';
import styles from './TrackerCardPlaceholder.module.scss';

export interface ITrackerCardPlaceholderProps {
  onCreateClick: () => void;
}

export const TrackerCardPlaceholder = ({ onCreateClick }: ITrackerCardPlaceholderProps) => {
  const message = useMessage();

  return (
    <Card className={styles.placeholderCard}>
      <Space direction="vertical" align="center">
        <Typography.Title level={4} className={styles.title}>
          {message('trackers.placeholder.title')}
        </Typography.Title>
        <Typography.Paragraph className={styles.description}>
          {message('trackers.placeholder.description')}
        </Typography.Paragraph>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={onCreateClick}
          className={styles.createButton}
        >
          {message('trackers.placeholder.createButton')}
        </Button>
      </Space>
    </Card>
  );
};
