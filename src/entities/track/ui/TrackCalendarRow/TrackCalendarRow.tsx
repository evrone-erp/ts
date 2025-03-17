import { Button } from 'antd';
import { PushpinFilled, PushpinOutlined } from '@ant-design/icons';
import { ArrowRight } from 'components/Icons/ArrowRight';
import { IssueStatusBadge } from 'entities/issue/ui/IssueStatusBadge';
import { useTrackerUrl } from 'entities/track/lib/hooks/use-tracker-url';
import { TrackInnerRows } from 'entities/track/ui//TrackInnerRows';
import { AddNewTrackRowButton } from 'entities/track/ui/AddNewTrackRowButton';
import { memo, useCallback, useMemo, useState } from 'react';
import { TrackCalendarColIssueSumDay } from 'entities/track/ui/TrackCalendarColIssueSumDay';
import { TrackCalendarInnerRow } from 'entities/track/ui/TrackCalendarInnerRow';
import { TrackCalendarColSumIssue } from 'entities/track/ui/TrackCalendarColSumIssue';
import { compareTrackCalendarRowProps } from 'entities/track/ui/TrackCalendarRow/compareTrackCalendarRowProps';
import { TIssue } from 'entities/issue/model/types';
import { TTrack } from 'entities/track/model/types';
import { useMessage } from 'entities/locale/lib/hooks';
import styles from './TrackCalendarRow.module.scss';

export type TTrackCalendarRowProps = {
  range: string[];
  issue: TIssue;
  tracks?: TTrack[] | undefined;
  date2IssueTracks: Record<string, TTrack[]>;
  isEdit?: boolean;
  pinnedIssues: string[];
  pinIssue: (issueKey: string) => void;
  unpinIssue: (issueKey: string) => void;
};

const fixedColumnsCount = 3; // 3 = issueKey + status + summary columns

// !NOTICE that this memo component has custom compareProps function implementation
export const TrackCalendarRow = memo(
  ({
    range,
    issue,
    isEdit = false,
    pinnedIssues,
    pinIssue,
    unpinIssue,
    date2IssueTracks,
    tracks,
  }: TTrackCalendarRowProps) => {
    const message = useMessage();
    const [isExpanded, setIsExpanded] = useState(false);
    const trackerUrl = useTrackerUrl(issue);
    const issueId = issue.id;
    const issueKey = issue.key;

    const issueIsPinned = useMemo(() => pinnedIssues.includes(issueKey), [pinnedIssues, issueKey]);

    const handlePinIssue = useCallback(() => {
      pinIssue(issueKey);
    }, [pinIssue, issueKey]);

    const handleUnpinIssue = useCallback(() => {
      unpinIssue(issueKey);
    }, [issueKey, unpinIssue]);

    if (!issue) {
      return null;
    }

    const rowColSpan = range.length + fixedColumnsCount;

    return (
      <>
        <tr className={styles.row}>
          <th className={styles.issueCol}>
            <div>
              <Button
                type="text"
                shape="circle"
                className={styles.expandBtn}
                data-expanded={isExpanded}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <ArrowRight />
              </Button>

              <div className={styles.issueDescription}>
                <div className={styles.issueKeyRow}>
                  <a className={styles.issueKey} href={trackerUrl} target="_blank" rel="nofollow noopener noreferrer">
                    {issue.key}
                  </a>
                  {issueIsPinned ? (
                    <PushpinFilled className={styles.pinIcon} onClick={handleUnpinIssue} />
                  ) : (
                    <PushpinOutlined className={styles.pinIcon} onClick={handlePinIssue} />
                  )}
                </div>
                <div className={styles.issueSummary}>{issue.summary}</div>
              </div>
            </div>
          </th>

          <th className={styles.statusCol} aria-label="issue status badge">
            <div>
              <IssueStatusBadge status={issue.status} />
            </div>
          </th>

          {range.map((date) => (
            <TrackCalendarColIssueSumDay
              key={date.valueOf()}
              isEdit={isEdit}
              date={date}
              tracks={date2IssueTracks[date]}
              issueKey={issueKey}
            />
          ))}

          <TrackCalendarColSumIssue tracks={tracks} />
        </tr>

        {isExpanded && (
          <>
            {isEdit && (
              <TrackCalendarInnerRow>
                <td colSpan={rowColSpan} className={styles.newTrackRow} aria-label={message('track.create.add')}>
                  <AddNewTrackRowButton issueKey={issueKey} />
                </td>
              </TrackCalendarInnerRow>
            )}

            <TrackInnerRows issueId={issueId} tracks={tracks} range={range} isEdit={isEdit} />
          </>
        )}
      </>
    );
  },
  compareTrackCalendarRowProps,
);

TrackCalendarRow.displayName = 'TrackCalendarRow';
