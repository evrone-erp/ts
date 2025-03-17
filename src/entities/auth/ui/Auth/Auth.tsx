import { TConfigAuth } from 'entities/config/model/types';
import queryString from 'query-string';
import { FC, useEffect, useMemo } from 'react';
import { appPaths } from 'shared/config/constants';
import { useRouter } from 'next/router';
import { TTrackerConfig } from 'entities/tracker/model/types';

type TProps = {
  config: TConfigAuth;
  tracker: TTrackerConfig;
};

export const Auth: FC<TProps> = ({ config, tracker }) => {
  const router = useRouter();

  const redirect_uri = useMemo(() => {
    const result = new URL(window.location.origin);

    result.pathname = appPaths.token;
    result.search = queryString.stringify({
      redirect_path: router.pathname,
      ...router.query,
    });

    return result.href;
  }, [router.pathname, router.query]);

  const url = useMemo(() => {
    const result = new URL(config.url);

    let force_confirm = true;
    try {
      force_confirm = !tracker.lastLogin;
    } catch (e) {
      console.error(e);
    }

    result.search = queryString.stringify({
      ...config.params,
      force_confirm,
      redirect_uri,
    });

    return result.href;
  }, [config.params, config.url, redirect_uri, tracker.lastLogin]);

  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null;
};
