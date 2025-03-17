import { Auth } from 'entities/auth/ui/Auth';
import { configApi } from 'entities/config/model/api';
import React, { PropsWithChildren } from 'react';
import { TTrackerConfig } from 'entities/tracker/model/types';

type TProps = {
  tracker: TTrackerConfig;
};

export const AuthRoute = ({ children, tracker }: PropsWithChildren<TProps>) => {
  const { configAuth } = configApi.useGetConfigQuery(undefined, {
    selectFromResult: (state) => ({ configAuth: state.data?.auth }),
  });

  const { authToken } = tracker;

  if (authToken) {
    return <>{children}</>;
  }

  if (configAuth) {
    return <Auth config={configAuth} tracker={tracker} />;
  }

  return null;
};
