import { IIssueTracksProps, IssueTracks } from 'entities/track/common/ui/IssueTracks/IssueTracks';
import { TYandexTrackerConfig } from 'entities/tracker/model/types';
import { TTrackInputEditForm } from 'entities/track/common/model/types';
import { useMemo } from 'react';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { yandexTrackApi } from 'entities/track/yandex/model/yandex-api';

type TProps = Pick<IIssueTracksProps, 'issueKey' | 'date' | 'className'> & {
  tracker: TYandexTrackerConfig;
  uId: number | undefined;
  isTrackUpdateLoading: boolean;
  isEditTrackComment: boolean;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
};

export const YandexIssueTracksConnected = (props: TProps) => {
  const { date, issueKey, uId, tracker } = props;

  const { from, to } = useMemo(() => {
    const dateObj = DateWrapper.getDate({ date, utcOffsetInMinutes: undefined });

    return { from: dateObj.startOf('day').format(), to: dateObj.endOf('day').format() };
  }, [date]);

  const { currentData: tracks } = yandexTrackApi.useGetYandexTracksQuery(
    { issueKey: issueKey ?? '', createdBy: uId, from, to, utcOffsetInMinutes: undefined, tracker },
    { skip: !issueKey || !date || !uId },
  );

  return <IssueTracks {...props} issueTracksForDate={tracks} />;
};
