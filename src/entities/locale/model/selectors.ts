import { locale } from 'entities/locale/model/reducers';
import type { TLocaleStore } from 'entities/locale/model/types';
import type { TAppState } from 'shared/lib/types';

export const selectLocale = (state: TAppState) => state[locale.name] as TLocaleStore;
export const selectLocaleCurrent = (state: TAppState) => selectLocale(state).current;
