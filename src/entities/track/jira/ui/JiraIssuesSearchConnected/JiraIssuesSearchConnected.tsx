import { IssuesSearch } from 'entities/issue/common/ui/IssuesSearch/IssuesSearch';
import type { TJiraTrackerConfig } from 'entities/tracker/model/types';
import type { AutoCompleteProps } from 'antd';
import type { FieldInputProps } from 'react-final-form';
import { useJiraIssuesSearchOptions } from 'entities/issue/jira/lib/use-jira-issues-search-options';

type TProps = AutoCompleteProps<string> &
  FieldInputProps<string> & {
    tracker: TJiraTrackerConfig;
  };

export const JiraIssuesSearchConnected = (props: TProps) => {
  const { value, tracker } = props;
  const { onSearch, options, isFetching } = useJiraIssuesSearchOptions(tracker, value);

  return <IssuesSearch {...props} onSearch={onSearch} options={options} isFetchingIssues={isFetching} />;
};
