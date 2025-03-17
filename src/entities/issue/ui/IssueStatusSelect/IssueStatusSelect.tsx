import { issueApi } from 'entities/issue/model/api';
import { selectLocaleCurrent } from 'entities/locale/model/selectors';
import { useAppSelector } from 'shared/lib/hooks';
import * as React from 'react';
import { useMemo } from 'react';
import { Select } from 'antd';
import { useMessage } from 'entities/locale/lib/hooks';
import { defaultLocale } from 'entities/locale/model/constants';
import styles from './IssueStatusSelect.module.scss';

interface IIssueStatusSelectProps {
  value: string[];
  onChange(value: string[]): void;
}

const filterOption = (input: string, option?: { label: string }) =>
  option?.label.toLowerCase().includes(input) ?? false;

export const IssueStatusSelect = ({ onChange, value }: IIssueStatusSelectProps) => {
  const language = useAppSelector(selectLocaleCurrent);

  const { currentData: statusList, isFetching: isFetchingStatusList } = issueApi.useGetStatusesQuery(
    { language: language ?? defaultLocale },
    { skip: !language },
  );

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
