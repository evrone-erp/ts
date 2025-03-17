import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { trackApi } from 'entities/track/model/api';
import { track } from 'entities/track/model/reducers';
import { TTrackInputDelete } from 'entities/track/model/types';

export function useDeleteTrack(trackInput?: TTrackInputDelete) {
  const dispatch = useAppDispatch();
  const [deleteTrack, { isLoading }] = trackApi.useDeleteMutation();

  const onDeleteButtonClick = useCallback(() => {
    if (trackInput) {
      deleteTrack(trackInput);
      dispatch(track.actions.setInputDelete());
    }
  }, [trackInput, deleteTrack, dispatch]);

  return { isLoading, onDeleteButtonClick };
}
