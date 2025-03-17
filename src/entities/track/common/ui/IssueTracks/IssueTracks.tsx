import { useMemo } from 'react';
import { TrackEdit } from 'entities/track/common/ui/TrackEdit/TrackEdit';
import { Message } from 'entities/locale/ui/Message';
import { DATE_FORMAT_DATE } from 'features/date/lib/constants';
import { Divider } from 'antd';
import styles from 'entities/track/common/ui/IssueTracks/IssueTracks.module.scss';
import { clsx } from 'clsx';
import { useISODurationsToTotalDurationData } from 'entities/track/common/lib/hooks/use-iso-dirations-to-total-duration-data';
import { DurationFormat } from 'features/date/ui/DurationFormat';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { TTrackInputEditForm, TTransformedTracks } from 'entities/track/common/model/types';

export interface IIssueTracksProps {
  issueKey: string | undefined;
  date: string | undefined;
  issueTracksForDate: TTransformedTracks | undefined;
  isTrackUpdateLoading: boolean;
  isEditTrackComment: boolean;
  className?: string;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
}

export const IssueTracks = ({
  issueKey,
  date,
  className,
  isTrackUpdateLoading,
  updateTrack,
  isEditTrackComment,
  issueTracksForDate,
}: IIssueTracksProps) => {
  const formattedDate = useMemo(
    () => DateWrapper.getDate({ date, utcOffsetInMinutes: undefined }).format(DATE_FORMAT_DATE),
    [date],
  );

  const durationTotal = useISODurationsToTotalDurationData(issueTracksForDate?.list ?? []);

  if (!issueKey || !issueTracksForDate || issueTracksForDate.list.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Divider orientation="left" orientationMargin={0}>
        <Message id="issue.tracksForDate.title" values={{ date: formattedDate, issueKey }} />
      </Divider>
      <div className={styles.gridContainer}>
        <p>
          <Message id="track.start.title" />
        </p>
        <p>
          <Message id="track.duration.title" />
        </p>
        <p>
          <Message id="track.comment.title" />
        </p>
        {/* These 2 elements are filler, required for the grid to work. If there are better ways to make grid work without them, feel free to change it */}
        <p />
        <p />
        {issueTracksForDate.list.map((track) => (
          <TrackEdit
            key={track.id}
            track={track}
            issueKey={issueKey}
            className={styles.trackForm}
            spinnerClassName={(isLoading) => clsx(styles.trackSpinner, { [styles.trackSpinner_loading]: isLoading })}
            isTrackUpdateLoading={isTrackUpdateLoading}
            updateTrack={updateTrack}
            isEditTrackComment={isEditTrackComment}
          />
        ))}
      </div>
      <p>
        <Message id="issue.item.summary" />: <DurationFormat duration={durationTotal} />
      </p>
    </div>
  );
};
