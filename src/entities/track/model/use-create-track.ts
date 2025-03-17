import { useCallback } from 'react';
import { trackApi } from 'entities/track/model/api';
import { useAppDispatch } from 'shared/lib/hooks';
import { track } from 'entities/track/model/reducers';
import { humanReadableDurationToISO } from 'entities/track/lib/human-readable-duration-to-iso';
import { TCreateTrackParams } from 'entities/track/model/types';

export function useCreateTrack() {
  const [createTrack, { isLoading }] = trackApi.useCreateMutation();
  const dispatch = useAppDispatch();

  const onTrackFormCreateSubmit = useCallback(
    async (params: TCreateTrackParams) => {
      const duration = humanReadableDurationToISO(params.duration);
      if (!duration) {
        return;
      }
      await createTrack({
        ...params,
        duration,
      });
      dispatch(track.actions.setInputCreate());
    },
    [createTrack, dispatch],
  );

  return { isLoading, onTrackFormCreateSubmit };
}
