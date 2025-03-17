import { getMessage } from 'entities/locale/lib/helpers';
import { TMessage } from 'entities/locale/model/types';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useAppSelector } from 'shared/lib/hooks';
import { selectLocaleCurrent } from 'entities/locale/model/selectors';

export const useMessage = (): TMessage => {
  const intl = useIntl();

  return useMemo(() => getMessage(intl), [intl]);
};

export const useCurrentLocale = () => useAppSelector(selectLocaleCurrent);
