import React, { useCallback } from 'react';
import { AutoCompleteProps, Select, Spin } from 'antd';
import { FieldInputProps } from 'react-final-form';
import { TOption } from 'shared/lib/types';

export type TIssuesSearchProps = AutoCompleteProps<string> &
  FieldInputProps<string> & {
    options: TOption[];
    isFetchingIssues: boolean;
    onSearch(value: string): void;
  };

export const IssuesSearch = ({
  onChange,
  value,
  options,
  onSearch,
  isFetchingIssues,
  ...autoCompleteProps
}: TIssuesSearchProps) => {
  const handleSelect = useCallback(
    (issueKey: string) => {
      onChange(issueKey);
    },
    [onChange],
  );

  return (
    <Select
      {...autoCompleteProps}
      showSearch
      allowClear
      options={options}
      onSearch={onSearch}
      // when initial value is undefined, react-final-form may pass "" here and in that case antd select doesn't show placeholder
      value={value || undefined}
      optionFilterProp="label"
      onSelect={handleSelect}
      dropdownRender={(menu) => <Spin spinning={isFetchingIssues}>{menu}</Spin>}
    />
  );
};
