import { useUnauthorizedTracker } from 'entities/auth/ui/common/UnauthorizedTracker/useUnauthorizedTracker';
import { useFilterValues } from 'features/filters/lib/useFilterValues';
import { YandexTimesheet } from 'entities/track/yandex/ui/YandexTimesheet/YandexTimesheet';
import { Loading } from 'shared/ui/Loading';
import { TCurrentLocale } from 'entities/locale/model/types';
import { TYandexTrackerConfig } from 'entities/tracker/model/types';
import { UserLoadFail } from 'entities/auth/ui/common/UserLoadFail/UserLoadFail';
import { useYandexUser } from 'entities/user/yandex/hooks/use-yandex-user';
import { useSetTrackerUsername } from 'entities/tracker/lib/useSetTrackerUsername';
import { useLogoutTracker } from 'entities/tracker/lib/useLogoutTracker';

type TProps = {
  language: TCurrentLocale | undefined;
  tracker: TYandexTrackerConfig;
};

export const YandexAuthorizedTimesheet = ({ language, tracker }: TProps) => {
  const { userId } = useFilterValues();

  const { uId, isLoadingSelf, errorSelf, self } = useYandexUser(tracker, userId);

  const logout = useLogoutTracker(tracker);

  useSetTrackerUsername(tracker, self?.email);

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
      <YandexTimesheet language={language} tracker={tracker} uId={uId} />
    </Loading>
  );
};
