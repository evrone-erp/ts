import React, { FC, useCallback } from 'react';
import { useIssuesList } from 'entities/issue/yandex/lib/use-issues-list';
import { usePinnedIssues } from 'entities/issue/common/lib/use-pinned-issues';

import { yandexTrackApi } from 'entities/track/yandex/model/yandex-api';
import { TCurrentLocale } from 'entities/locale/model/types';
import { TrackCalendar } from 'entities/track/common/ui/TrackCalendar/TrackCalendar';
import { YandexTrackCalendarRowConnected } from 'entities/track/yandex/ui/YandexTrackCalendarRowConnected';
import { YandexTrackCalendarFootConnected } from 'entities/track/yandex/ui/YandexTrackCalendarFootConnected/YandexTrackCalendarFootConnected';
import { TrackCalendarHeader } from 'entities/track/common/ui/TrackCalendarHeader/TrackCalendarHeader';
import { TYandexTrackerConfig } from 'entities/tracker/model/types';
import { useUpdateYandexTrack } from 'entities/track/yandex/lib/hooks/use-update-yandex-track';
import { useCreateYandexTrack } from 'entities/track/yandex/lib/hooks/use-create-yandex-track';
import { useDeleteYandexTrack } from 'entities/track/yandex/lib/hooks/use-delete-yandex-track';
import { YandexIssueTracksConnected } from 'entities/track/yandex/ui/YandexIssueTracksConnected/YandexIssueTracksConnected';
import { YandexIssuesSearchConnected } from 'entities/track/yandex/ui/YandexIssuesSearchConnected/YandexIssuesSearchConnected';
import { yandexQueueApi } from 'entities/queue/yandex/model/yandex-api';
import { useFilters } from 'features/filters/lib/useFilters';
import { YandexUserSelectConnected } from 'entities/track/yandex/ui/YandexUserSelectConnected/YandexUserSelectConnected';
import { YandexIssueStatusSelectConnected } from 'entities/issue/yandex/ui/YandexIssueStatusSelectConnected/YandexIssueStatusSelectConnected';
import { QueueSelect } from 'entities/queue/common/ui/QueueSelect/QueueSelect';
import { IssueSummarySearch } from 'entities/issue/common/ui/IssueSummarySearch/IssueSummarySearch';
import { Message } from 'entities/locale/ui/Message';
import { Button } from 'antd';
import { YANDEX_ISSUE_SORTING_KEY } from 'entities/issue/yandex/model/constants';
import { useLogoutTracker } from 'entities/tracker/lib/useLogoutTracker';

type TProps = {
  language: TCurrentLocale | undefined;
  uId: number | undefined;
  tracker: TYandexTrackerConfig;
};

export const YandexTimesheet: FC<TProps> = ({ language, tracker, uId }) => {
  const logout = useLogoutTracker(tracker);

  const {
    from,
    to,
    showWeekends,
    issueStatus,
    sorting,
    summary,
    queue,
    utcOffsetInMinutes,
    userId: userIdFromFilter,
    updateIssueStatus,
    updateSummary,
    updateQueue,
  } = useFilters();

  const { pinnedIssues, pinIssue, unpinIssue } = usePinnedIssues(tracker.orgId);

  const { isLoading: isLoadingTracks, currentData: tracksData } = yandexTrackApi.useGetYandexTracksQuery(
    { from, to, createdBy: uId, utcOffsetInMinutes, tracker },
    { skip: !uId },
  );
  const { isLoadingIssues, issues } = useIssuesList({
    from,
    to,
    user: uId,
    statusList: issueStatus,
    summary,
    language,
    queue,
    issuesFromTracks: tracksData?.issueKeyList,
    pinnedIssues,
    sortBy: sorting.sortBy ?? YANDEX_ISSUE_SORTING_KEY,
    sortOrder: sorting.sortOrder,
    utcOffsetInMinutes,
    tracker,
  });

  const { currentData: queueList, isFetching: isFetchingQueueList } = yandexQueueApi.useGetQueuesQuery({ tracker });

  const { isTrackCreateLoading, createTrack } = useCreateYandexTrack(tracker);
  const { updateTrack, isTrackUpdateLoading } = useUpdateYandexTrack(tracker);
  const { isTrackDeleteLoading, deleteTrack } = useDeleteYandexTrack(tracker);

  const getIssueUrl = useCallback((issueKey: string) => new URL(issueKey, tracker.url).href, [tracker]);

  const viewingAnotherUser = !!userIdFromFilter;
  const isEdit = !viewingAnotherUser && utcOffsetInMinutes === undefined;
  const isLoading = isLoadingIssues || isLoadingTracks;

  return (
    <div>
      <TrackCalendarHeader
        isEdit={isEdit}
        upperRowControls={
          <Button onClick={logout} type="link">
            <Message id="home.logout" />
          </Button>
        }
        filters={
          <>
            <YandexUserSelectConnected tracker={tracker} userId={userIdFromFilter} />
            <YandexIssueStatusSelectConnected
              tracker={tracker}
              value={issueStatus}
              language={language}
              onChange={updateIssueStatus}
            />
            <QueueSelect
              value={queue}
              onChange={updateQueue}
              queueList={queueList}
              isFetchingQueueList={isFetchingQueueList}
            />
            <IssueSummarySearch defaultValue={summary} onSearch={updateSummary} />
          </>
        }
      />
      <TrackCalendar
        tracker={tracker}
        isEdit={isEdit}
        from={from}
        to={to}
        showWeekends={showWeekends}
        utcOffsetInMinutes={utcOffsetInMinutes}
        issueSortingKey={YANDEX_ISSUE_SORTING_KEY}
        isLoading={isLoading}
        issues={issues}
        pinnedIssues={pinnedIssues}
        pinIssue={pinIssue}
        unpinIssue={unpinIssue}
        isTrackCreateLoading={isTrackCreateLoading}
        createTrack={createTrack}
        isTrackDeleteLoading={isTrackDeleteLoading}
        deleteTrack={deleteTrack}
        renderTrackCalendarRowConnected={(props) => (
          <YandexTrackCalendarRowConnected
            {...props}
            tracker={tracker}
            updateTrack={updateTrack}
            getIssueUrl={getIssueUrl}
          />
        )}
        renderTrackCalendarFootConnected={(props) => <YandexTrackCalendarFootConnected {...props} tracker={tracker} />}
        renderIssueTracksConnected={(props) => (
          <YandexIssueTracksConnected
            {...props}
            isEditTrackComment
            tracker={tracker}
            updateTrack={updateTrack}
            isTrackUpdateLoading={isTrackUpdateLoading}
            uId={uId}
          />
        )}
        renderIssuesSearchConnected={(props) => <YandexIssuesSearchConnected {...props} tracker={tracker} />}
      />
    </div>
  );
};
