import { TYandexTrackerConfig } from 'entities/tracker/model/types';
import { UserSelect } from 'entities/track/common/ui/TrackCalendarHeader/UserSelect';
import { yandexUserApi } from 'entities/user/yandex/model/yandex-api';
import { useYandexUser } from 'entities/user/yandex/hooks/use-yandex-user';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import { useMemo, useState } from 'react';

type TProps = {
  tracker: TYandexTrackerConfig;
  userId: string | undefined;
};

export const YandexUserSelectConnected = ({ tracker, userId }: TProps) => {
  const [isUsersLoad, setIsUsersLoad] = useState(false);

  const { isLoading, data: users } = yandexUserApi.useGetYandexUsersListQuery({ tracker }, { skip: !isUsersLoad });

  const { user } = useYandexUser(tracker, userId);

  const userOptions: DefaultOptionType[] = useMemo(() => {
    if (users?.length) {
      return users.map((u) => ({ value: String(u.uid), label: u.display }));
    }
    return [{ value: String(user?.uid), label: user?.display }];
  }, [user, users]);

  return (
    <UserSelect
      allowClear={!!userId}
      userOptions={userOptions}
      isLoading={isLoading}
      setShouldLoad={setIsUsersLoad}
      value={user?.uid}
    />
  );
};
