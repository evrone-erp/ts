import { selectAuthToken } from 'entities/auth/model/selectors';
import { Auth } from 'entities/auth/ui/Auth';
import { configApi } from 'entities/config/model/api';
import React, { PropsWithChildren } from 'react';
import { useAppSelector } from 'shared/lib/hooks';

export const AuthRoute = ({ children }: PropsWithChildren) => {
  const { configAuth } = configApi.useGetConfigQuery(undefined, {
    selectFromResult: (state) => ({ configAuth: state.data?.auth }),
  });

  const authToken = useAppSelector(selectAuthToken);

  if (authToken) {
    return <>{children}</>;
  }

  if (configAuth) {
    return <Auth config={configAuth} />;
  }

  return null;
};
