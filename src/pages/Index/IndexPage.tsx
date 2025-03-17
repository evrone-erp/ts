import { UnauthorizedTracker } from 'entities/auth/ui/UnauthorizedTracker';
import { useMessage } from 'entities/locale/lib/hooks';
import { TrackCalendar } from 'entities/track/ui/TrackCalendar';
import { TrackCalendarHeader } from 'entities/track/ui/TrackCalendarHeader/TrackCalendarHeader';
import { useIsUserLoading } from 'entities/user/hooks/use-is-user-loading';
import { FC } from 'react';
import { useGlobalLoader } from 'shared/api';
import { Loading } from 'shared/ui/Loading';
import { Head } from 'widgets/Head';
import { Layout } from 'widgets/Layout';
import { useFilterValues } from 'features/filters/lib/useFilterValues';

export const IndexPage: FC = () => {
  const message = useMessage();

  const { userId, utcOffsetInMinutes } = useFilterValues();

  const { error, isUserLoading } = useIsUserLoading(userId);
  const isEdit = !userId && utcOffsetInMinutes === undefined;
  const isFetching = useGlobalLoader();

  if (error && 'status' in error && [401, 403].includes(error.status as number)) {
    return <UnauthorizedTracker status={error.status as 401 | 403} />;
  }

  return (
    <Layout head={<Head description={message('home.description')} title={message('home.title')} />}>
      <Loading isLoading={isUserLoading}>
        <TrackCalendarHeader userId={userId} isFetching={isFetching} isEdit={isEdit} />
        <TrackCalendar userId={userId} isEdit={isEdit} />
      </Loading>
    </Layout>
  );
};
