import { YANDEX_TRACKER_API_ROOT } from 'shared/api/constants';

export const yandexUserEndpoints = {
  user: (userId: string) => `${YANDEX_TRACKER_API_ROOT}/users/${userId}`,
  users: `${YANDEX_TRACKER_API_ROOT}/users`,
  myself: `${YANDEX_TRACKER_API_ROOT}/myself`,
};
