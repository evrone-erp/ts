import { DateWrapper } from 'features/date/lib/DateWrapper';
import { TTrack } from 'entities/track/model/types';
import { memo } from 'react';
import { useFilterValues } from 'features/filters/lib/useFilterValues';
import { TrackDurationEdit } from './TrackDurationEdit';
import styles from './TrackColumn.module.scss';

interface ITrackColumnProps {
  track: TTrack;
  date: string;
  issueId: string;
  isEdit?: boolean;
}

export const TrackColumn = memo(({ track, date, issueId, isEdit }: ITrackColumnProps) => {
  const { utcOffsetInMinutes } = useFilterValues();
  const isSameDay = DateWrapper.getDate({ date: track?.start, utcOffsetInMinutes }).isSame(date, 'day');

  if (!isSameDay) {
    return (
      <td className={styles.cell}>
        <span>—</span>
      </td>
    );
  }

  return <TrackDurationEdit trackItem={track} issueId={issueId} isEdit={isEdit} />;
});

TrackColumn.displayName = 'TrackColumn';
