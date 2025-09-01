import React, { PropsWithChildren } from 'react';
import { configApi } from 'entities/config/model/api';
import { TJiraTrackerConfig } from 'entities/tracker/model/types';
import { JiraAuth } from 'entities/auth/ui/jira/JiraAuth/JiraAuth';
import { Loading } from 'shared/ui/Loading';
import { useRefreshJiraToken } from 'entities/auth/lib/jira/useRefreshJiraToken';

type TProps = {
  tracker: TJiraTrackerConfig;
};

export const JiraAuthRoute = ({ children, tracker }: PropsWithChildren<TProps>) => {
  const { configAuth } = configApi.useGetConfigQuery(undefined, {
    selectFromResult: (state) => ({ configAuth: state.data?.jiraAuth }),
  });

  const clientId = configAuth?.params.client_id;

  const { tokenExpiryTimestamp = 0, authToken, refreshTokenExpiryTimestamp = 0, refreshToken } = tracker;

  const isTokenExpired = new Date().valueOf() > tokenExpiryTimestamp;

  const isRefreshTokenExpired = new Date().valueOf() > refreshTokenExpiryTimestamp;

  const shouldRefresh = !!clientId && !!authToken && !!refreshToken && isTokenExpired && !isRefreshTokenExpired;
  const shouldRenderChildren = !!authToken && !isTokenExpired;

  const { isError } = useRefreshJiraToken(tracker.id, tokenExpiryTimestamp, refreshToken, clientId);

  if (shouldRefresh && !isError) {
    return <Loading isLoading />;
  }

  if (shouldRenderChildren) {
    return <>{children}</>;
  }

  if (configAuth) {
    return <JiraAuth config={configAuth} tracker={tracker} />;
  }

  return null;
};
