import { TTrackerConfig } from 'entities/tracker/model/types';
import { jiraUserApi } from 'entities/user/jira/model/jira-api';

export function useJiraUser(tracker: TTrackerConfig, id?: string) {
  const { data: self, isLoading: isLoadingSelf, error: errorSelf } = jiraUserApi.useGetMyselfJiraQuery({ tracker });

  const { data: otherUser } = jiraUserApi.useGetJiraUserQuery({ userId: id ?? '', tracker }, { skip: !id });

  const user = id ? otherUser : self;

  return { user, uId: user?.accountId, isLoadingSelf, errorSelf };
}
