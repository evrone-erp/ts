import { Button } from 'antd';
import { PushpinFilled, PushpinOutlined } from '@ant-design/icons';
import { ArrowRight } from 'components/Icons/ArrowRight';
import { IssueStatusBadge } from 'entities/issue/common/ui/IssueStatusBadge';
import { TrackInnerRows } from 'entities/track/common/ui//TrackInnerRows';
import { AddNewTrackRowButton } from 'entities/track/common/ui/AddNewTrackRowButton';
import { memo, useCallback, useMemo, useState } from 'react';
import { TrackCalendarColIssueSumDay } from 'entities/track/common/ui/TrackCalendarColIssueSumDay';
import { TrackCalendarInnerRow } from 'entities/track/common/ui/TrackCalendarInnerRow';
import { TrackCalendarColSumIssue } from 'entities/track/common/ui/TrackCalendarColSumIssue';
import { compareTrackCalendarRowProps } from 'entities/track/common/ui/TrackCalendarRow/compareTrackCalendarRowProps';
import { TTrack, TTrackInputEditForm } from 'entities/track/common/model/types';
import { useMessage } from 'entities/locale/lib/hooks';
import { TIssue } from 'entities/issue/common/model/types';
import styles from './TrackCalendarRow.module.scss';

export type TTrackCalendarRowProps = {
  range: string[];
  issue: TIssue;
  tracks?: TTrack[] | undefined;
  date2IssueTracks: Record<string, TTrack[]>;
  isEdit?: boolean;
  isEditTrackComment?: boolean;
  trackCommentEditDisabledReason?: string;
  pinnedIssues: string[];
  pinIssue?(issueKey: string): void;
  unpinIssue?(issueKey: string): void;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
  getIssueUrl(issueKey: string): string;
};

const fixedColumnsCount = 3; // 3 = issueKey + status + summary columns

// !NOTICE that this memo component has custom compareProps function implementation
export const TrackCalendarRow = memo(
  ({
    range,
    issue,
    isEdit = false,
    isEditTrackComment = isEdit,
    pinnedIssues,
    pinIssue,
    unpinIssue,
    date2IssueTracks,
    tracks,
    updateTrack,
    getIssueUrl,
    trackCommentEditDisabledReason,
  }: TTrackCalendarRowProps) => {
    const message = useMessage();
    const [isExpanded, setIsExpanded] = useState(false);
    const issueId = issue.id;
    const issueKey = issue.key;

    const issueIsPinned = useMemo(() => pinnedIssues.includes(issueKey), [pinnedIssues, issueKey]);

    const handlePinIssue = useCallback(() => {
      pinIssue?.(issueKey);
    }, [pinIssue, issueKey]);

    const handleUnpinIssue = useCallback(() => {
      unpinIssue?.(issueKey);
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
                  <a
                    className={styles.issueKey}
                    href={getIssueUrl(issue.key)}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    {issue.key}
                  </a>
                  {issueIsPinned ? (
                    <>{unpinIssue && <PushpinFilled className={styles.pinIcon} onClick={handleUnpinIssue} />}</>
                  ) : (
                    <>{pinIssue && <PushpinOutlined className={styles.pinIcon} onClick={handlePinIssue} />}</>
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

            <TrackInnerRows
              issueId={issueId}
              tracks={tracks}
              range={range}
              isEdit={isEdit}
              isEditTrackComment={isEditTrackComment}
              trackCommentEditDisabledReason={trackCommentEditDisabledReason}
              updateTrack={updateTrack}
            />
          </>
        )}
      </>
    );
  },
  compareTrackCalendarRowProps,
);

TrackCalendarRow.displayName = 'TrackCalendarRow';
