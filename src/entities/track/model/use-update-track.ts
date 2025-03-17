import { trackApi } from 'entities/track/model/api';
import { TTrackInputEditForm } from 'entities/track/model/types';
import { useCallback } from 'react';

export function useUpdateTrack(issueIdOrKey?: string, trackId?: number) {
  const [startUpdateMutation, result] = trackApi.useUpdateMutation();

  const updateTrack = useCallback(
    (input: Partial<TTrackInputEditForm>) => {
      if (!trackId || !issueIdOrKey) return;
      startUpdateMutation({
        form: input,
        param: {
          issueIdOrKey,
          trackId,
        },
      });
    },
    [trackId, issueIdOrKey, startUpdateMutation],
  );

  return [updateTrack, result] as const;
}
