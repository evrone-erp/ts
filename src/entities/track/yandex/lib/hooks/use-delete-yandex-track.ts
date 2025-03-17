import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { yandexTrackApi } from 'entities/track/yandex/model/yandex-api';
import { track } from 'entities/track/common/model/reducers';
import { TTrackInputDelete } from 'entities/track/common/model/types';
import { TTrackerConfig } from 'entities/tracker/model/types';

export function useDeleteYandexTrack(tracker: TTrackerConfig) {
  const dispatch = useAppDispatch();
  const [deleteTrackMutation, { isLoading: isTrackDeleteLoading }] = yandexTrackApi.useDeleteYandexTrackMutation();

  const deleteTrack = useCallback(
    (trackInput: TTrackInputDelete) => {
      deleteTrackMutation({ tracker, ...trackInput });
      dispatch(track.actions.setInputDelete());
    },
    [tracker, deleteTrackMutation, dispatch],
  );

  return { isTrackDeleteLoading, deleteTrack };
}
