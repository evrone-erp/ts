import { trackApi } from 'entities/track/model/api';
import { useFilterValues } from 'features/filters/lib/useFilterValues';
import { useUser } from 'entities/user/hooks/use-user';
import { useMemo } from 'react';
import { TrackEdit } from 'entities/track/ui/TrackEdit/TrackEdit';
import { Message } from 'entities/locale/ui/Message';
import { DATE_FORMAT_DATE } from 'features/date/lib/constants';
import { Divider } from 'antd';
import styles from 'entities/track/ui/IssueTracks/IssueTracks.module.scss';
import { clsx } from 'clsx';
import { useISODurationsToTotalDurationData } from 'entities/track/lib/hooks/use-iso-dirations-to-total-duration-data';
import { DurationFormat } from 'features/date/ui/DurationFormat';
import { DateWrapper } from 'features/date/lib/DateWrapper';

interface IIssueTracksProps {
  issueKey: string | undefined;
  date: string | undefined;
  className?: string;
}

export const IssueTracks = ({ issueKey, date, className }: IIssueTracksProps) => {
  const { userId } = useFilterValues();
  const { uId } = useUser(userId);

  const { from, to } = useMemo(() => {
    const dateObj = DateWrapper.getDate({ date, utcOffsetInMinutes: undefined });

    return { from: dateObj.startOf('day').format(), to: dateObj.endOf('day').format() };
  }, [date]);

  const formattedDate = useMemo(
    () => DateWrapper.getDate({ date, utcOffsetInMinutes: undefined }).format(DATE_FORMAT_DATE),
    [date],
  );

  const { currentData: tracks } = trackApi.useGetTracksQuery(
    { issueKey: issueKey ?? '', createdBy: uId, from, to, utcOffsetInMinutes: undefined },
    { skip: !issueKey || !date || !uId },
  );

  const durationTotal = useISODurationsToTotalDurationData(tracks?.list ?? []);

  if (!issueKey || !tracks || tracks.list.length === 0) {
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
        {tracks.list.map((track) => (
          <TrackEdit
            key={track.id}
            track={track}
            issueKey={issueKey}
            className={styles.trackForm}
            spinnerClassName={(isLoading) => clsx(styles.trackSpinner, { [styles.trackSpinner_loading]: isLoading })}
          />
        ))}
      </div>
      <p>
        <Message id="issue.item.summary" />: <DurationFormat duration={durationTotal} />
      </p>
    </div>
  );
};
