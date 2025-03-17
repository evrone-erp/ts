import { memo } from 'react';
import { Message } from 'entities/locale/ui/Message';
import { useCurrentTracks } from 'entities/track/lib/hooks/use-current-tracks';
import styles from './TrackCalendarFoot.module.scss';
import { TrackCalendarFootColSumDay } from './TrackCalendarFootColSumDay';
import { TrackCalendarFootColSum } from './TrackCalendarFootColSum';

interface ITrackCalendarFootProps {
  range: string[];
  totalIssues: number;
  utcOffsetInMinutes: number | undefined;
}

export const TrackCalendarFoot = memo(({ range, totalIssues, utcOffsetInMinutes }: ITrackCalendarFootProps) => {
  const { date2Tracks, trackList } = useCurrentTracks();

  return (
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
  );
});

TrackCalendarFoot.displayName = 'TrackCalendarFoot';
