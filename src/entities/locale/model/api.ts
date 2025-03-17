import { api } from 'shared/api/api';
import { TLocale } from 'entities/locale/model/types';

type TLocaleResponse = {
  [key: string]: string;
};

type TLocaleList = TLocale[];

export const localeApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMessages: builder.query<TLocaleResponse, TLocale>({
      query: (language) => `/local/api/locale-${language}.json`,
    }),
    getLocales: builder.query<TLocaleList, void>({
      query: () => `/local/api/locale.json`,
    }),
  }),
});
