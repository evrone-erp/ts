import { TrackCalendarHead } from 'entities/track/ui/TrackCalendarHead';
import React, { FC } from 'react';
import { Loading } from 'shared/ui/Loading';
import { useFilterValues } from 'features/filters/lib/useFilterValues';
import { useUser } from 'entities/user/hooks/use-user';
import { TrackCalendarFoot } from 'entities/track/ui/TrackCalendarFoot/TrackCalendarFoot';
import { useIssuesList } from 'entities/issue/lib/use-issues-list';
import { TrackModalCreate } from 'entities/track/ui/TrackModalCreate';
import { TrackModalDelete } from 'entities/track/ui/TrackModalDelete';
import { usePinnedIssues } from 'entities/issue/lib/use-pinned-issues';

import { trackApi } from 'entities/track/model/api';
import { TrackCalendarRowConnected } from 'entities/track/ui/TrackCalendarRowConnected';
import { useAppSelector } from 'shared/lib/hooks';
import { selectLocaleCurrent } from 'entities/locale/model/selectors';
import { useScrollToCurrent } from './use-scroll-to-current';
import { useRange } from './use-range';

import styles from './TrackCalendar.module.scss';

type TProps = {
  userId?: string;
  isEdit?: boolean;
};

export const TrackCalendar: FC<TProps> = ({ userId, isEdit = false }) => {
  const { user, uId, isLoading: isLoadingUser } = useUser(userId);

  const language = useAppSelector(selectLocaleCurrent);

  const { from, to, showWeekends, issueStatus, sorting, summary, queue, utcOffsetInMinutes } = useFilterValues();
  const { pinnedIssues, pinIssue, unpinIssue } = usePinnedIssues();

  const range = useRange({ from, to, showWeekends, utcOffsetInMinutes });

  const { isLoading: isLoadingTracks, currentData: tracksData } = trackApi.useGetTracksQuery(
    { from, to, createdBy: uId, utcOffsetInMinutes },
    { skip: !uId },
  );
  const { isLoadingIssues, issues } = useIssuesList({
    from,
    to,
    userName: user?.display,
    statusList: issueStatus,
    summary,
    language,
    queue,
    issuesFromTracks: tracksData?.issueKeyList,
    pinnedIssues,
    sortBy: sorting.sortBy,
    sortOder: sorting.sortOrder,
    utcOffsetInMinutes,
  });

  const tableRef = useScrollToCurrent();

  const isLoading = isLoadingUser || isLoadingIssues || isLoadingTracks;

  return (
    <Loading isLoading={isLoading}>
      <div className={styles.wrapper}>
        <table className={styles.table} ref={tableRef}>
          <TrackCalendarHead range={range} />
          <tbody>
            {issues.map((issue) => (
              <TrackCalendarRowConnected
                key={issue.id}
                range={range}
                issue={issue}
                isEdit={isEdit}
                pinnedIssues={pinnedIssues}
                pinIssue={pinIssue}
                unpinIssue={unpinIssue}
              />
            ))}
          </tbody>
          <TrackCalendarFoot range={range} totalIssues={issues.length} utcOffsetInMinutes={utcOffsetInMinutes} />
        </table>
        {isEdit && (
          <>
            <TrackModalCreate />
            <TrackModalDelete />
          </>
        )}
      </div>
    </Loading>
  );
};
