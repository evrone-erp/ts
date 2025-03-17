import { skipToken } from '@reduxjs/toolkit/query';
import { userApi } from 'entities/user/model/api';

export function useUser(id?: string) {
  const { data: self, isLoading: isLoadingSelf } = userApi.useGetMyselfQuery(undefined, {
    skip: !!id,
  });

  const { data: otherUser, isLoading: isLoadingOtherUser } = userApi.useGetUserByIdQuery(id ?? skipToken);

  const user = id ? otherUser : self;
  const isLoading = id ? isLoadingOtherUser : isLoadingSelf;
  return { user, uId: user?.uid, isLoading };
}
