import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { actionLocaleSetCurrent } from 'entities/locale/model/actions';
import { selectLocaleCurrent } from 'entities/locale/model/selectors';
import React, { useCallback } from 'react';
import { Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { localeApi } from 'entities/locale/model/api';
import { TLocale } from 'entities/locale/model/types';

const renderLocaleOption = (locale: TLocale): DefaultOptionType => ({ label: locale, value: locale });

export const LocaleSelector = () => {
  const dispatch = useAppDispatch();
  const localeCurrent = useAppSelector(selectLocaleCurrent);
  const { data: localeList } = localeApi.useGetLocalesQuery();

  const onLocaleChange = useCallback(
    (locale: TLocale) => {
      dispatch(actionLocaleSetCurrent(locale));
    },
    [dispatch],
  );

  return <Select onChange={onLocaleChange} options={localeList?.map(renderLocaleOption) ?? []} value={localeCurrent} />;
};
