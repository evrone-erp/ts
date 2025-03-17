import { IIssueTracksProps, IssueTracks } from 'entities/track/common/ui/IssueTracks/IssueTracks';
import { TJiraTrackerConfig } from 'entities/tracker/model/types';
import { TTrackInputEditForm } from 'entities/track/common/model/types';
import { useMemo } from 'react';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { jiraTrackApi } from 'entities/track/jira/model/jira-api';

type TProps = Pick<IIssueTracksProps, 'issueKey' | 'date' | 'className'> & {
  tracker: TJiraTrackerConfig;
  uId: string | undefined;
  isTrackUpdateLoading: boolean;
  isEditTrackComment: boolean;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
};

export const JiraIssueTracksConnected = (props: TProps) => {
  const { date, issueKey, tracker, uId } = props;

  const { from, to, fromTimestamp, toTimestamp } = useMemo(() => {
    const dateObj = DateWrapper.getDate({ date, utcOffsetInMinutes: undefined });

    const fromDate = dateObj.startOf('day');
    const toDate = dateObj.endOf('day');

    return {
      from: fromDate.format(),
      to: toDate.format(),
      fromTimestamp: fromDate.valueOf(),
      toTimestamp: toDate.valueOf(),
    };
  }, [date]);

  const { currentData: tracks } = jiraTrackApi.useGetJiraTracksQuery(
    {
      from,
      to,
      fromTimestamp,
      toTimestamp,
      issueKeyList: issueKey ? [issueKey] : [],
      utcOffsetInMinutes: undefined,
      tracker,
      userId: uId ?? '',
    },
    { skip: !issueKey || !date || !uId },
  );

  return <IssueTracks {...props} issueTracksForDate={tracks} />;
};
