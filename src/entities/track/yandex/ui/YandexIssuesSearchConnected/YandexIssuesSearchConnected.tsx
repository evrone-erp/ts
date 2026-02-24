import { IssuesSearch } from 'entities/issue/common/ui/IssuesSearch/IssuesSearch';
import type { TYandexTrackerConfig } from 'entities/tracker/model/types';
import { useYandexIssuesSearchOptions } from 'entities/issue/yandex/lib/use-yandex-issues-search-options';
import type { AutoCompleteProps } from 'antd';
import type { FieldInputProps } from 'react-final-form';

type TProps = AutoCompleteProps<string> &
  FieldInputProps<string> & {
    tracker: TYandexTrackerConfig;
  };

export const YandexIssuesSearchConnected = (props: TProps) => {
  const { value, tracker } = props;
  const { onSearch, options, isFetching } = useYandexIssuesSearchOptions(tracker, value);

  return <IssuesSearch {...props} onSearch={onSearch} options={options} isFetchingIssues={isFetching} />;
};
