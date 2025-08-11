import { TLocale, TMessage } from 'entities/locale/model/types';
import { IntlShape } from 'react-intl';

type TGetOptions = (id: string) => {
  defaultMessage: string;
  id: string;
};

export const getOptions: TGetOptions = (id: string) => ({ defaultMessage: '\u00A0', id });

export type TGetMessage = (intl: IntlShape) => TMessage;

export const getMessage: TGetMessage = (intl) => (id, values) => {
  const formatted = intl.formatMessage(getOptions(id), values);
  return Array.isArray(formatted) ? formatted.join('') : (formatted as string);
};

export const isRuLocale = (locale: TLocale | null) => locale === 'ru';
