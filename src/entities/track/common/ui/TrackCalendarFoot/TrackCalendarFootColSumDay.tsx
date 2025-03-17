import { DurationFormat } from 'features/date/ui/DurationFormat';
import { memo, useMemo } from 'react';
import { useISODurationsToTotalDurationData } from 'entities/track/common/lib/hooks/use-iso-dirations-to-total-duration-data';
import { HOUR_A_BUSINESS_DAY } from 'entities/track/common/lib/constants';
import { TTrack } from 'entities/track/common/model/types';
import { comparePropsWithTracks } from 'entities/track/common/lib/compare-props-with-tracks';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { clsx } from 'clsx';
import styles from './TrackCalendarFootColSumDay.module.scss';

type TProps = {
  tracks: TTrack[] | undefined;
  date: string;
  utcOffsetInMinutes: number | undefined;
};

// !NOTICE that this memo component has custom compareProps function implementation
export const TrackCalendarFootColSumDay = memo(({ tracks = [], date, utcOffsetInMinutes }: TProps) => {
  const durationTotal = useISODurationsToTotalDurationData(tracks);

  const trackedHours = durationTotal.hours;

  const isExactTracked = trackedHours === HOUR_A_BUSINESS_DAY;
  const isUndertracked = Boolean(tracks.length) && trackedHours < HOUR_A_BUSINESS_DAY;

  const dateObj = useMemo(() => DateWrapper.getDate({ date, utcOffsetInMinutes }), [date, utcOffsetInMinutes]);
  const isWeekend = useMemo(() => DateWrapper.isWeekend(dateObj), [dateObj]);

  return (
    <td
      className={clsx(styles.col, { [styles.col_weekend]: isWeekend })}
      data-is-undertracked={isUndertracked}
      data-is-exact-tracked={isExactTracked}
    >
      <span aria-label="total day sum">{tracks.length ? <DurationFormat duration={durationTotal} /> : '—'}</span>
    </td>
  );
}, comparePropsWithTracks);

TrackCalendarFootColSumDay.displayName = 'TrackCalendarFootColSumDay';
