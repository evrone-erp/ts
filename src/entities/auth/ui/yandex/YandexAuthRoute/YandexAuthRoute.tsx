import { YandexAuth } from 'entities/auth/ui/yandex/YandexAuth/YandexAuth';
import { configApi } from 'entities/config/model/api';
import React, { PropsWithChildren } from 'react';
import { TYandexTrackerConfig } from 'entities/tracker/model/types';

type TProps = {
  tracker: TYandexTrackerConfig;
};

export const YandexAuthRoute = ({ children, tracker }: PropsWithChildren<TProps>) => {
  const { configAuth } = configApi.useGetConfigQuery(undefined, {
    selectFromResult: (state) => ({ configAuth: state.data?.auth }),
  });

  const { authToken } = tracker;

  if (authToken) {
    return <>{children}</>;
  }

  if (configAuth) {
    return <YandexAuth config={configAuth} tracker={tracker} />;
  }

  return null;
};
