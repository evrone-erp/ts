import { IssuesSearch } from 'entities/issue/common/ui/IssuesSearch/IssuesSearch';
import { TJiraTrackerConfig } from 'entities/tracker/model/types';
import { AutoCompleteProps } from 'antd';
import { FieldInputProps } from 'react-final-form';
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
