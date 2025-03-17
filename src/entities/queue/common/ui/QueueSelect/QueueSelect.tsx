import * as React from 'react';
import { useMemo } from 'react';
import { Select } from 'antd';
import { useMessage } from 'entities/locale/lib/hooks';
import styles from 'entities/queue/common/ui/QueueSelect/QueueSelect.module.scss';
import { TQueue } from 'entities/queue/common/model/types';

interface IQueueSelectProps {
  queueList: TQueue[] | undefined;
  isFetchingQueueList: boolean;
  value: string[];
  onChange(value: string[]): void;
}

export const QueueSelect = ({ onChange, value, queueList, isFetchingQueueList }: IQueueSelectProps) => {
  const message = useMessage();

  const options = useMemo(() => queueList?.map((queue) => ({ label: queue.key, value: queue.key })) ?? [], [queueList]);

  return (
    <Select
      className={styles.select}
      options={options}
      mode="multiple"
      onChange={onChange}
      value={value}
      bordered={false}
      allowClear
      placeholder={message('filter.queue.placeholder')}
      loading={isFetchingQueueList}
      maxTagCount="responsive"
    />
  );
};
