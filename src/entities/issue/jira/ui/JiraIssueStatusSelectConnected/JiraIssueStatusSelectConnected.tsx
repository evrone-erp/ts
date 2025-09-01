import { defaultLocale } from 'entities/locale/model/constants';
import { TCurrentLocale } from 'entities/locale/model/types';
import { TJiraTrackerConfig } from 'entities/tracker/model/types';
import {
  IIssueStatusSelectProps,
  IssueStatusSelect,
} from 'entities/issue/common/ui/IssueStatusSelect/IssueStatusSelect';
import { jiraIssueApi } from 'entities/issue/jira/model/jira-api';

type TProps = Omit<IIssueStatusSelectProps, 'statusList' | 'isFetchingStatusList'> & {
  language: TCurrentLocale | undefined;
  tracker: TJiraTrackerConfig;
};

export const JiraIssueStatusSelectConnected = ({ language, tracker, ...props }: TProps) => {
  const { currentData: statusList, isFetching: isFetchingStatusList } = jiraIssueApi.useGetJiraStatusesQuery(
    { language: language ?? defaultLocale, tracker },
    { skip: !language },
  );

  return <IssueStatusSelect {...props} statusList={statusList} isFetchingStatusList={isFetchingStatusList} />;
};
