import React, { FC, useCallback, useMemo, useState } from 'react';
import { usePinnedIssues } from 'entities/issue/common/lib/use-pinned-issues';
import { TrackCalendar } from 'entities/track/common/ui/TrackCalendar/TrackCalendar';
import { jiraIssueApi } from 'entities/issue/jira/model/jira-api';
import { TJiraTrackerConfig } from 'entities/tracker/model/types';
import { JiraTrackCalendarRowConnected } from 'entities/track/jira/ui/JiraTrackCalendarRowConnected/JiraTrackCalendarRowConnected';
import { jiraTrackApi } from 'entities/track/jira/model/jira-api';
import { JiraTrackCalendarFootConnected } from 'entities/track/jira/ui/JiraTrackCalendarFootConnected/JiraTrackCalendarFootConnected';
import { TrackCalendarHeader } from 'entities/track/common/ui/TrackCalendarHeader/TrackCalendarHeader';
import { useCreateJiraTrack } from 'entities/track/jira/lib/hooks/use-create-jira-track';
import { useDeleteJiraTrack } from 'entities/track/jira/lib/hooks/use-delete-jira-track';
import { useUpdateJiraTrack } from 'entities/track/jira/lib/hooks/use-update-jira-track';
import { JiraIssueTracksConnected } from 'entities/track/jira/ui/JiraIssueTracksConnected/JiraIssueTracksConnected';
import { JiraIssuesSearchConnected } from 'entities/track/jira/ui/JiraIssuesSearchConnected/JiraIssuesSearchConnected';
import { jiraProjectApi } from 'entities/queue/jira/jira-api';
import { TCurrentLocale } from 'entities/locale/model/types';
import { useFilters } from 'features/filters/lib/useFilters';
import { JiraUserSelectConnected } from 'entities/track/jira/ui/JiraUserSelectConnected/JiraUserSelectConnected';
import { JiraIssueStatusSelectConnected } from 'entities/issue/jira/ui/JiraIssueStatusSelectConnected/JiraIssueStatusSelectConnected';
import { QueueSelect } from 'entities/queue/common/ui/QueueSelect/QueueSelect';
import { IssueSummarySearch } from 'entities/issue/common/ui/IssueSummarySearch/IssueSummarySearch';
import { JIRA_ISSUE_SORTING_KEY } from 'entities/issue/jira/model/constants';
import { sortWithPinedIssues } from 'entities/issue/common/lib/sortWithPinedIssues';
import { TTrackFormCreateFields } from 'entities/track/common/ui/TrackFormCreate/types';

type TProps = {
  language: TCurrentLocale | undefined;
  tracker: TJiraTrackerConfig;
  uId: string | undefined;
};

export const JiraTimesheet: FC<TProps> = ({ tracker, language, uId }) => {
  // due to how issues and worklogs are loaded from jira, we have to include issue keys for all created tracks here in order
  // to always load issue for the track.
  // otherwise in case user creates track for an issue that hasn't been loaded yet, it wouldn't be loaded
  const [createdTrackIssueKeys, setCreatedTrackIssueKeys] = useState<string[]>([]);

  const {
    from,
    to,
    fromTimestamp,
    toTimestamp,
    showWeekends,
    utcOffsetInMinutes,
    queue,
    summary,
    userId: userIdFromFilter,
    issueStatus,
    updateIssueStatus,
    updateSummary,
    updateQueue,
    sorting,
  } = useFilters();

  const { pinnedIssues, pinIssue, unpinIssue } = usePinnedIssues(tracker.url);

  const includeIssues = useMemo(
    () => Array.from(new Set([...pinnedIssues, ...createdTrackIssueKeys])),
    [pinnedIssues, createdTrackIssueKeys],
  );

  const { currentData: issues, isLoading: isLoadingIssues } = jiraIssueApi.useGetJiraIssuesQuery(
    {
      from,
      to,
      queue,
      utcOffsetInMinutes,
      summary,
      user: uId ?? '',
      statusList: issueStatus,
      includeIssues,
      sortBy: sorting.sortBy ?? JIRA_ISSUE_SORTING_KEY,
      sortOrder: sorting.sortOrder,
      tracker,
    },
    { skip: !uId },
  );

  const sortedIssues = useMemo(() => issues?.toSorted(sortWithPinedIssues(pinnedIssues)) ?? [], [issues, pinnedIssues]);

  const issueKeyList = useMemo(() => sortedIssues?.map((i) => i.key) ?? [], [sortedIssues]);

  const { currentData: tracks, isLoading: isLoadingTracks } = jiraTrackApi.useGetJiraTracksQuery(
    {
      from,
      to,
      fromTimestamp,
      toTimestamp,
      issueKeyList,
      utcOffsetInMinutes,
      tracker,
      userId: uId ?? '',
    },
    { skip: issueKeyList.length === 0 || !uId },
  );

  const { currentData: queueList, isFetching: isFetchingQueueList } = jiraProjectApi.useGetProjectsQuery({ tracker });

  const { isTrackCreateLoading, createTrack } = useCreateJiraTrack(tracker);
  const { updateTrack, isTrackUpdateLoading } = useUpdateJiraTrack(tracker);
  const { isTrackDeleteLoading, deleteTrack } = useDeleteJiraTrack(tracker);

  const onCreateTrack = useCallback(
    async (fields: TTrackFormCreateFields) => {
      await createTrack(fields);
      setCreatedTrackIssueKeys((keys) => [...keys, fields.issueKey]);
    },
    [createTrack],
  );

  const getIssueUrl = useCallback((issueKey: string) => new URL(`/browse/${issueKey}`, tracker.url).href, [tracker]);

  const viewingAnotherUser = !!userIdFromFilter;
  const isEdit = !viewingAnotherUser && utcOffsetInMinutes === undefined;
  const isLoading = isLoadingIssues || isLoadingTracks;

  return (
    <div>
      <TrackCalendarHeader
        isEdit={isEdit}
        filters={
          <>
            <JiraUserSelectConnected tracker={tracker} userId={userIdFromFilter} />
            <JiraIssueStatusSelectConnected
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
        issueSortingKey={JIRA_ISSUE_SORTING_KEY}
        isLoading={isLoading}
        issues={sortedIssues}
        pinnedIssues={pinnedIssues}
        pinIssue={pinIssue}
        unpinIssue={unpinIssue}
        isTrackCreateLoading={isTrackCreateLoading}
        createTrack={onCreateTrack}
        isTrackDeleteLoading={isTrackDeleteLoading}
        deleteTrack={deleteTrack}
        renderTrackCalendarRowConnected={(props) => (
          <JiraTrackCalendarRowConnected
            {...props}
            isEditTrackComment={false}
            tracks={tracks}
            updateTrack={updateTrack}
            getIssueUrl={getIssueUrl}
          />
        )}
        renderTrackCalendarFootConnected={(props) => <JiraTrackCalendarFootConnected {...props} tracks={tracks} />}
        renderIssueTracksConnected={(props) => (
          <JiraIssueTracksConnected
            {...props}
            isEditTrackComment={false}
            tracker={tracker}
            updateTrack={updateTrack}
            isTrackUpdateLoading={isTrackUpdateLoading}
            uId={uId}
          />
        )}
        renderIssuesSearchConnected={(props) => <JiraIssuesSearchConnected {...props} tracker={tracker} />}
      />
    </div>
  );
};
