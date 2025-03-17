import { TJiraTrackerConfig } from 'entities/tracker/model/types';
import { UserSelect } from 'entities/track/common/ui/TrackCalendarHeader/UserSelect';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import { useMemo, useState } from 'react';
import { useJiraUser } from 'entities/user/jira/hooks/use-jira-user';
import { jiraUserApi } from 'entities/user/jira/model/jira-api';

type TProps = {
  tracker: TJiraTrackerConfig;
  userId: string | undefined;
};

export const JiraUserSelectConnected = ({ tracker, userId }: TProps) => {
  const [isUsersLoad, setIsUsersLoad] = useState(false);

  const { isLoading, data: users } = jiraUserApi.useGetJiraUsersListQuery({ tracker }, { skip: !isUsersLoad });

  const { user } = useJiraUser(tracker, userId);

  const userOptions: DefaultOptionType[] = useMemo(() => {
    if (users?.length) {
      return users.map((u) => ({ value: String(u.accountId), label: u.displayName }));
    }
    return [{ value: String(user?.accountId), label: user?.displayName }];
  }, [user, users]);

  return (
    <UserSelect
      allowClear={!!userId}
      userOptions={userOptions}
      isLoading={isLoading}
      setShouldLoad={setIsUsersLoad}
      value={user?.accountId}
    />
  );
};
