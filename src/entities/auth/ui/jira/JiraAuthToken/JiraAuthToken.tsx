import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { Loading } from 'shared/ui/Loading';
import Link from 'next/link';
import { jiraAuthApi } from 'entities/auth/model/jira/jira-api';
import { trackers } from 'entities/tracker/model/reducers';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { Message } from 'entities/locale/ui/Message';

type TProps = {
  token: string | null;
  tokenExpiresInSeconds: number;
  refreshToken: string | null;
  refreshTokenExpiresInDays: number;
};

const paramsToRemove = ['client_id', 'code', 'internal_redirect_uri', 'state'];

export const JiraAuthToken = ({ token, tokenExpiresInSeconds, refreshToken, refreshTokenExpiresInDays }: TProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const redirection = useMemo(() => {
    const parameters = new URLSearchParams(window.location.search);

    const pathToRedirect = parameters.get('redirect_path');
    parameters.delete('redirect_path');

    paramsToRemove.forEach((param) => {
      parameters.delete(param);
    });

    return {
      pathname: pathToRedirect,
      query: parameters.toString(),
    };
  }, []);

  const { data: accessibleResources } = jiraAuthApi.useGetAccessibleResourcesQuery(token ?? '', { skip: !token });

  useEffect(() => {
    if (!accessibleResources || !token || !refreshToken || !tokenExpiresInSeconds || !refreshTokenExpiresInDays) {
      return;
    }

    const now = DateWrapper.now();

    dispatch(
      trackers.actions.setJiraTokenAndCloudIdByUrls({
        token,
        tokenExpiryTimestamp: now.add(tokenExpiresInSeconds, 'seconds').valueOf(),
        refreshToken,
        refreshTokenExpiryTimestamp: now.add(refreshTokenExpiresInDays, 'days').valueOf(),
        urls: accessibleResources.map(({ url }) => url),
        url2CloudId: Object.fromEntries(accessibleResources.map(({ id, url }) => [url, id])),
      }),
    );

    router.replace(redirection);
  }, [
    dispatch,
    router,
    accessibleResources,
    token,
    redirection,
    tokenExpiresInSeconds,
    refreshToken,
    refreshTokenExpiresInDays,
  ]);

  if (!token) {
    return (
      <div>
        <Message id="unauthorizedTracker.tokenError" />{' '}
        <Link href={redirection}>
          <Message id="unauthorizedTracker.authenticateAgain" />
        </Link>
      </div>
    );
  }

  return <Loading isLoading />;
};
