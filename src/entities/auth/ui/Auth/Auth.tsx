import { TConfigAuth } from 'entities/config/model/types';
import queryString from 'query-string';
import { FC, useEffect, useMemo } from 'react';
import { appPaths } from 'shared/config/constants';
import { useRouter } from 'next/router';
import { LAST_LOGIN_STORAGE_KEY } from 'entities/auth/model/constants';

type TProps = {
  config: TConfigAuth;
};

export const Auth: FC<TProps> = ({ config }) => {
  const router = useRouter();

  const redirect_uri = useMemo(() => {
    const result = new URL(window.location.origin);

    result.pathname = appPaths.token;
    result.search = queryString.stringify(router.query);

    return result.href;
  }, [router.query]);

  const url = useMemo(() => {
    const result = new URL(config.url);

    let force_confirm = true;
    try {
      force_confirm = !localStorage.getItem(LAST_LOGIN_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }

    result.search = queryString.stringify({
      ...config.params,
      force_confirm,
      redirect_uri,
    });

    return result.href;
  }, [config.params, config.url, redirect_uri]);

  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null;
};
