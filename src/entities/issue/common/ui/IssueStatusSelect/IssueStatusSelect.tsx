import * as React from 'react';
import { useMemo } from 'react';
import { Select } from 'antd';
import { useMessage } from 'entities/locale/lib/hooks';
import styles from 'entities/issue/common/ui/IssueStatusSelect/IssueStatusSelect.module.scss';
import { TIssueStatusDescription } from 'entities/issue/common/model/types';

export interface IIssueStatusSelectProps {
  value: string[];
  statusList: TIssueStatusDescription[] | undefined;
  isFetchingStatusList: boolean;
  onChange(value: string[]): void;
}

const filterOption = (input: string, option?: { label: string }) =>
  option?.label.toLowerCase().includes(input) ?? false;

export const IssueStatusSelect = ({ onChange, value, statusList, isFetchingStatusList }: IIssueStatusSelectProps) => {
  const message = useMessage();

  const options = useMemo(
    () => statusList?.map((status) => ({ label: status.name, value: status.id.toString() })) ?? [],
    [statusList],
  );

  return (
    <Select
      className={styles.select}
      options={options}
      mode="multiple"
      onChange={onChange}
      value={value}
      bordered={false}
      filterOption={filterOption}
      allowClear
      placeholder={message('filter.status.placeholder')}
      loading={isFetchingStatusList}
      maxTagCount="responsive"
    />
  );
};
