import { DateWrapper } from 'features/date/lib/DateWrapper';
import { TAppDispatch } from 'shared/lib/types';
import { trackers } from 'entities/tracker/model/reducers';

export const actionSetTrackerToken = (token: string, trackerId: string | undefined) => (dispatch: TAppDispatch) => {
  const lastLogin = DateWrapper.getDateFormat(DateWrapper.getDate({ utcOffsetInMinutes: undefined }));

  dispatch(
    trackers.actions.setAuthToken({
      token,
      lastLogin,
      id: trackerId,
    }),
  );
};
