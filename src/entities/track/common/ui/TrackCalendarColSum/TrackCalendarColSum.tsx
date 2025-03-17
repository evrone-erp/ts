import { clsx } from 'clsx';
import { dashIsEmpty } from 'entities/track/common/lib/helpers';
import { TrackCalendarSum } from 'entities/track/common/ui/TrackCalendarSum';
import React, { memo } from 'react';
import { TTrack } from 'entities/track/common/model/types';
import styles from './TrackCalendarColSum.module.scss';

type TProps = {
  track: TTrack;
  className?: string;
};

export const TrackCalendarColSum = memo(({ track, className = '' }: TProps) => (
  <td className={clsx(styles.cell, className)}>{dashIsEmpty(track, <TrackCalendarSum tracksOrTrack={track} />)}</td>
));

TrackCalendarColSum.displayName = 'TrackCalendarColSum';
