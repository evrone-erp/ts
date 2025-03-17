import { useCallback } from 'react';
import { yandexTrackApi } from 'entities/track/yandex/model/yandex-api';
import { useAppDispatch } from 'shared/lib/hooks';
import { track } from 'entities/track/common/model/reducers';
import { humanReadableDurationToISO } from 'entities/track/common/lib/human-readable-duration-to-iso';
import { TTrackFormCreateFields } from 'entities/track/common/ui/TrackFormCreate/types';
import { TTrackerConfig } from 'entities/tracker/model/types';

export function useCreateYandexTrack(tracker: TTrackerConfig) {
  const [createTrackMutation, { isLoading: isTrackCreateLoading }] = yandexTrackApi.useCreateYandexTrackMutation();
  const dispatch = useAppDispatch();

  const createTrack = useCallback(
    async (params: TTrackFormCreateFields) => {
      const duration = humanReadableDurationToISO(params.duration);
      if (!duration) {
        return;
      }
      await createTrackMutation({
        ...params,
        duration,
        tracker,
      });
      dispatch(track.actions.setInputCreate());
    },
    [tracker, createTrackMutation, dispatch],
  );

  return { isTrackCreateLoading, createTrack };
}
