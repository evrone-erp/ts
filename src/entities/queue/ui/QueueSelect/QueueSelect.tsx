import * as React from 'react';
import { useMemo } from 'react';
import { Select } from 'antd';
import { useMessage } from 'entities/locale/lib/hooks';
import styles from 'entities/queue/ui/QueueSelect/QueueSelect.module.scss';
import { queueApi } from 'entities/queue/model/api';

interface IQueueSelectProps {
  value: string[];
  onChange(value: string[]): void;
}

export const QueueSelect = ({ onChange, value }: IQueueSelectProps) => {
  const { currentData: queueList, isFetching: isFetchingQueueList } = queueApi.useGetQueuesQuery();

  const message = useMessage();

  const options = useMemo(() => queueList?.map((queue) => ({ label: queue.key, value: queue.key })) ?? [], [queueList]);

  return (
    <Select
      className={styles.select}
      options={options}
      mode="multiple"
      onChange={onChange}
      value={value}
      variant="borderless"
      allowClear
      placeholder={message('filter.queue.placeholder')}
      loading={isFetchingQueueList}
      maxTagCount="responsive"
    />
  );
};
