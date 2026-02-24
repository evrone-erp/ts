import { YandexAuth } from 'entities/auth/ui/yandex/YandexAuth/YandexAuth';
import { configApi } from 'entities/config/model/api';
import type { PropsWithChildren } from 'react';
import React from 'react';
import type { TYandexTrackerConfig } from 'entities/tracker/model/types';

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
