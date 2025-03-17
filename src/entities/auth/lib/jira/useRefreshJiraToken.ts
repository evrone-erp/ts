import { jiraAuthApi } from 'entities/auth/model/jira/jira-api';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { trackers } from 'entities/tracker/model/reducers';
import { DateWrapper } from 'features/date/lib/DateWrapper';

export const useRefreshJiraToken = (
  trackerId: string,
  expiryTime: number,
  refreshToken: string | undefined,
  clientId: string | undefined,
) => {
  const dispatch = useAppDispatch();
  const [refreshTokenMutation, { isError, error }] = jiraAuthApi.useRefreshTokenMutation();

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (!clientId || !refreshToken) {
      return undefined;
    }

    const timeoutMs = expiryTime - new Date().valueOf();

    const timeoutId = window.setTimeout(async () => {
      const refreshedTokenData = await refreshTokenMutation({
        clientId: clientId ?? '',
        refreshToken: refreshToken ?? '',
      }).unwrap();

      const now = DateWrapper.now();

      dispatch(
        trackers.actions.setJiraTokens({
          trackerId,
          token: refreshedTokenData.access_token,
          refreshToken: refreshedTokenData.refresh_token,
          tokenExpiryTimestamp: now.add(refreshedTokenData.expires_in, 'seconds').valueOf(),
        }),
      );
    }, timeoutMs);

    return () => window.clearTimeout(timeoutId);
  }, [clientId, dispatch, expiryTime, refreshToken, refreshTokenMutation, trackerId]);

  return { isError };
};
