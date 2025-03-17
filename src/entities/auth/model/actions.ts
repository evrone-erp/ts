import { auth } from 'entities/auth/model/reducers';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { apiHeaders } from 'shared/api/api-base-query';
import { TAppDispatch } from 'shared/lib/types';
import { LAST_LOGIN_STORAGE_KEY } from './constants';

export const actionAuthSetToken = (token: string) => (dispatch: TAppDispatch) => {
  apiHeaders.setAuthToken(token);

  try {
    localStorage.setItem(
      LAST_LOGIN_STORAGE_KEY,
      DateWrapper.getDateFormat(DateWrapper.getDate({ utcOffsetInMinutes: undefined })),
    );
  } catch (e) {
    console.error(e);
  }

  dispatch(auth.actions.setToken(token));
};
