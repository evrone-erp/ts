import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { track } from 'entities/track/common/model/reducers';
import { DateWrapper, TDate } from 'features/date/lib/DateWrapper';

export const useAddNewTrackAction = (issueKey?: string) => {
  const dispatch = useAppDispatch();

  return useCallback(
    (start: TDate) => {
      dispatch(
        track.actions.setInputCreate({
          start: DateWrapper.getDateFormat(start),
          issueKey,
        }),
      );
    },
    [dispatch, issueKey],
  );
};
