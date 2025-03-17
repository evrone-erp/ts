import { locale } from 'entities/locale/model/reducers';
import { TLocaleStore } from 'entities/locale/model/types';
import { TAppState } from 'shared/lib/types';

export const selectLocale = (state: TAppState) => state[locale.name] as TLocaleStore;
export const selectLocaleCurrent = (state: TAppState) => selectLocale(state).current;
