import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { actionLocaleInit } from 'entities/locale/model/actions';
import { selectLocaleCurrent } from 'entities/locale/model/selectors';
import React, { useEffect, FC, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { localeApi } from 'entities/locale/model/api';
import { defaultLocale } from 'entities/locale/model/constants';

type TProps = {
  children: ReactNode;
};

export const LocaleProvider: FC<TProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionLocaleInit);
  }, [dispatch]);

  const language = useAppSelector(selectLocaleCurrent);

  const { data: messages } = localeApi.useGetMessagesQuery(language ?? defaultLocale, { skip: !language });

  if (!messages) {
    return null;
  }

  return (
    <IntlProvider locale={language ?? ''} messages={messages}>
      {children}
    </IntlProvider>
  );
};
