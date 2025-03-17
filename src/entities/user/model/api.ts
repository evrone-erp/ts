import { fetchAllPages, TFetchAllPagesBaseQueryResult } from 'shared/api';
import { api } from 'shared/api/api';
import { TPagination } from 'shared/lib/types';
import { YA_ROBOTS_IDS } from './constants';
import { TUser } from './types';

export const userApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUserById: builder.query<TUser, string>({
      query: (userId) => `/tracker/v2/users/${userId}`,
    }),
    getMyself: builder.query<TUser, void>({
      query: () => `/tracker/v2/myself`,
    }),
    getUsersList: builder.query<TUser[], TPagination>({
      async queryFn(_, __, ___, fetchWithBQ) {
        const res = await fetchAllPages(
          (page) =>
            fetchWithBQ({
              url: '/tracker/v2/users',
              params: { page, perPage: 999 },
            }) as TFetchAllPagesBaseQueryResult<TUser>,
        );

        if (res.data) {
          res.data = res.data.filter((user: TUser) => !user.dismissed && !YA_ROBOTS_IDS.has(user.uid));
        }

        return res;
      },
    }),
  }),
});
