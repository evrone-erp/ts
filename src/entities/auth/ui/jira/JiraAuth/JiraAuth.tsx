import { useGenerateJiraUserState } from 'entities/tracker/lib/useGenerateJiraUserState';
import { useEffect, useMemo } from 'react';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { TConfigAuth, TConfigJiraAuthParams } from 'entities/config/model/types';
import { TJiraTrackerConfig } from 'entities/tracker/model/types';
import { appPaths } from 'shared/config/constants';

type TProps = {
  config: TConfigAuth<TConfigJiraAuthParams>;
  tracker: TJiraTrackerConfig;
};

export const JiraAuth = ({ config, tracker }: TProps) => {
  const router = useRouter();

  const userStateStr = useGenerateJiraUserState(tracker);

  const redirect_uri = useMemo(() => {
    const result = new URL(window.location.origin);

    result.pathname = appPaths.jiraToken;
    result.search = encodeURIComponent(
      queryString.stringify({
        redirect_path: router.pathname,
        ...router.query,
        client_id: config?.params.client_id,
        internal_redirect_uri: new URL(appPaths.jiraToken, window.location.origin),
      }),
    );

    return result.href;
  }, [config, router.pathname, router.query]);

  const url = useMemo(() => {
    if (!config) {
      return '';
    }

    const result = new URL(config.url);

    result.search = queryString.stringify(
      {
        ...config.params,
        state: userStateStr,
        redirect_uri,
      },
      { arrayFormat: 'separator', arrayFormatSeparator: ' ' },
    );

    return result.href;
  }, [config, redirect_uri, userStateStr]);

  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null;
};
