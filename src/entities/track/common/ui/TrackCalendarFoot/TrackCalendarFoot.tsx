import { memo } from 'react';
import { Message } from 'entities/locale/ui/Message';
import { TTrack } from 'entities/track/common/model/types';
import styles from './TrackCalendarFoot.module.scss';
import { TrackCalendarFootColSumDay } from './TrackCalendarFootColSumDay';
import { TrackCalendarFootColSum } from './TrackCalendarFootColSum';

export interface ITrackCalendarFootProps {
  range: string[];
  totalIssues: number;
  utcOffsetInMinutes: number | undefined;
  date2Tracks: Record<string, TTrack[]>;
  trackList: TTrack[];
}

export const TrackCalendarFoot = memo(
  ({ range, totalIssues, utcOffsetInMinutes, date2Tracks, trackList }: ITrackCalendarFootProps) => (
    <tfoot className={styles.tfoot}>
      <tr>
        <th colSpan={2} className={styles.totalCol}>
          {!!totalIssues && (
            <span className={styles.total} aria-label="total issues">
              {' '}
              <Message id="issue.total" />
              {': '}
              <span>{totalIssues}</span>
            </span>
          )}
        </th>

        {range.map((date) => (
          <TrackCalendarFootColSumDay
            key={date}
            date={date}
            utcOffsetInMinutes={utcOffsetInMinutes}
            tracks={date2Tracks[date]}
          />
        ))}

        <TrackCalendarFootColSum tracks={trackList} />
      </tr>
    </tfoot>
  ),
);

TrackCalendarFoot.displayName = 'TrackCalendarFoot';
