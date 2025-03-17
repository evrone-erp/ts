import React, { FC, useCallback } from 'react';
import { AutoCompleteProps, Select, Spin } from 'antd';
import { FieldInputProps } from 'react-final-form';

import { useIssuesSearchOptions } from 'entities/issue/lib/use-issues-search-options';

type TIssuesSearchProps = AutoCompleteProps<string> & FieldInputProps<string>;

export const IssuesSearch: FC<TIssuesSearchProps> = ({ onChange, value, ...autoCompleteProps }) => {
  const { onSearch, options, isFetching } = useIssuesSearchOptions(value);

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
      dropdownRender={(menu) => <Spin spinning={isFetching}>{menu}</Spin>}
    />
  );
};
