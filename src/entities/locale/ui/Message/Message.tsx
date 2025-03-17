import { getOptions } from 'entities/locale/lib/helpers';
import { TMessageProps } from 'entities/locale/model/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

/**
 * Возвращает JSX.Element с переводом.
 * Пример использования <Message id="module.component.textSense" />
 */
export const Message = ({ id, values }: TMessageProps) => <FormattedMessage {...getOptions(id)} values={values} />;
