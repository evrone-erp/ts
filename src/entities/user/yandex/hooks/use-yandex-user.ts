import { yandexUserApi } from 'entities/user/yandex/model/yandex-api';
import { TTrackerConfig } from 'entities/tracker/model/types';

export function useYandexUser(tracker: TTrackerConfig, id?: string) {
  const { data: self, isLoading: isLoadingSelf, error: errorSelf } = yandexUserApi.useGetMyselfYandexQuery({ tracker });

  const { data: otherUser } = yandexUserApi.useGetYandexUserByIdQuery({ userId: id ?? '', tracker }, { skip: !id });

  const user = id ? otherUser : self;

  return { user, uId: user?.uid, isLoadingSelf, errorSelf, self };
}
