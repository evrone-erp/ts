import { yandexTrackApi } from 'entities/track/yandex/model/yandex-api';
import type { TTrackInputEditForm } from 'entities/track/common/model/types';
import { useCallback } from 'react';
import type { TTrackerConfig } from 'entities/tracker/model/types';

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
