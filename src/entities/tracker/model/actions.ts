import { DateWrapper } from 'features/date/lib/DateWrapper';
import { TAppDispatch } from 'shared/lib/types';
import { trackers } from 'entities/tracker/model/reducers';

const getLastLogin = () => DateWrapper.getDateFormat(DateWrapper.getDate({ utcOffsetInMinutes: undefined }));

export const actionSetYandexTrackerToken =
  (token: string, trackerId: string | undefined) => (dispatch: TAppDispatch) => {
    const lastLogin = getLastLogin();

    dispatch(
      trackers.actions.setYandexAuthToken({
        token,
        lastLogin,
        id: trackerId,
      }),
    );
  };
