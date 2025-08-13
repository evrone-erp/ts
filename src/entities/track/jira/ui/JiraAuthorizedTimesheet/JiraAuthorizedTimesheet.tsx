import { useUnauthorizedTracker } from 'entities/auth/ui/common/UnauthorizedTracker/useUnauthorizedTracker';
import { useFilterValues } from 'features/filters/lib/useFilterValues';
import { Loading } from 'shared/ui/Loading';
import { TCurrentLocale } from 'entities/locale/model/types';
import { TJiraTrackerConfig } from 'entities/tracker/model/types';
import { UserLoadFail } from 'entities/auth/ui/common/UserLoadFail/UserLoadFail';
import { useJiraUser } from 'entities/user/jira/hooks/use-jira-user';
import { JiraTimesheet } from 'entities/track/jira/ui/JiraTimesheet/JiraTimesheet';
import { useLogoutTracker } from 'entities/tracker/lib/useLogoutTracker';

type TProps = {
  language: TCurrentLocale | undefined;
  tracker: TJiraTrackerConfig;
};

export const JiraAuthorizedTimesheet = ({ language, tracker }: TProps) => {
  const { userId } = useFilterValues();

  const { isLoadingSelf, errorSelf, uId } = useJiraUser(tracker, userId);

  const logout = useLogoutTracker(tracker);

  const unauthorizedErrorElement = useUnauthorizedTracker(errorSelf, tracker, logout);

  if (unauthorizedErrorElement) {
    return unauthorizedErrorElement;
  }

  if (errorSelf) {
    return <UserLoadFail />;
  }

  if (!tracker) {
    return null;
  }

  return (
    <Loading isLoading={isLoadingSelf}>
      <JiraTimesheet language={language} tracker={tracker} uId={uId} />
    </Loading>
  );
};
