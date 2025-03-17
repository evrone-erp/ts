import { actionAuthSetToken } from 'entities/auth/model/actions';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { appPaths } from 'shared/config/constants';
import { useAppDispatch } from 'shared/lib/hooks';
import { Loading } from 'shared/ui/Loading';

export const AuthToken = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const token = useMemo(() => {
    const query = window.location.hash.split('#')[1];
    const parameters = new URLSearchParams(query);

    return parameters.get('access_token');
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(actionAuthSetToken(token));
      router.replace(`${appPaths.home}${window.location.search}`);
    }
  }, [dispatch, router, token]);

  return <Loading isLoading />;
};
