import { skipToken } from '@reduxjs/toolkit/query';
import { userApi } from 'entities/user/model/api';

export function useIsUserLoading(userId: string | undefined) {
  const { isLoadingSelf, selfError } = userApi.useGetMyselfQuery(undefined, {
    selectFromResult: (state) => ({ isLoadingSelf: state.isLoading, selfError: state.error }),
    skip: !!userId,
  });

  const { isLoadingUser, userError } = userApi.useGetUserByIdQuery(userId ?? skipToken, {
    selectFromResult: (state) => ({ isLoadingUser: state.isLoading, userError: state.error }),
  });

  return {
    isUserLoading: isLoadingSelf || isLoadingUser,
    error: selfError || userError,
  };
}
