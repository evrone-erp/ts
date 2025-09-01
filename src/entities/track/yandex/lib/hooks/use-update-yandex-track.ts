import { yandexTrackApi } from 'entities/track/yandex/model/yandex-api';
import { TTrackInputEditForm } from 'entities/track/common/model/types';
import { useCallback } from 'react';
import { TTrackerConfig } from 'entities/tracker/model/types';

export function useUpdateYandexTrack(tracker: TTrackerConfig) {
  const [startUpdateMutation, { isLoading: isTrackUpdateLoading }] = yandexTrackApi.useUpdateYandexTrackMutation();

  const updateTrack = useCallback(
    (input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string) => {
      if (!trackId || !issueIdOrKey) return;
      startUpdateMutation({
        tracker,
        form: input,
        param: {
          issueIdOrKey,
          trackId,
        },
      });
    },
    [tracker, startUpdateMutation],
  );

  return { updateTrack, isTrackUpdateLoading };
}
