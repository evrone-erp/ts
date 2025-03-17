import { currentLocaleKey, defaultLocale } from 'entities/locale/model/constants';
import { locale } from 'entities/locale/model/reducers';
import { selectLocaleCurrent } from 'entities/locale/model/selectors';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { TAppDispatch, TGetState } from 'shared/lib/types';
import { TLocale } from 'entities/locale/model/types';

export const actionLocaleSetCurrent = (currentLocale: TLocale) => (dispatch: TAppDispatch) => {
  localStorage.setItem(currentLocaleKey, currentLocale);
  DateWrapper.setLocale(currentLocale);

  return dispatch(locale.actions.setCurrent(currentLocale));
};

export const actionLocaleInit = (dispatch: TAppDispatch, getState: TGetState) => {
  const state = getState();
  const currentLocale =
    selectLocaleCurrent(state) || (localStorage.getItem(currentLocaleKey) as TLocale) || defaultLocale;
  return dispatch(actionLocaleSetCurrent(currentLocale));
};
