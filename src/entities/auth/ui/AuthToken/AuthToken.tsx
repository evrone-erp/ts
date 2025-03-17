import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { Loading } from 'shared/ui/Loading';
import { actionSetTrackerToken } from 'entities/tracker/model/actions';
import { getTrackerIdFromQuery } from 'entities/tracker/lib/getTrackerIdFromQuery';

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
      const parameters = new URLSearchParams(window.location.search);

      const pathToRedirect = parameters.get('redirect_path');
      parameters.delete('redirect_path');

      const trackerId = parameters.get('trackerId');

      dispatch(actionSetTrackerToken(token, trackerId ? getTrackerIdFromQuery(trackerId) : undefined));

      router.replace({
        pathname: pathToRedirect,
        query: parameters.toString(),
      });
    }
  }, [dispatch, router, token]);

  return <Loading isLoading />;
};
