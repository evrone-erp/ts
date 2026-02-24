import type { FormatXMLElementFn, PrimitiveType } from 'intl-messageformat';
import type React from 'react';

export type TLocaleStore = {
  current: TCurrentLocale;
};

export type TMessageProps = {
  id: string;
  values?: TMessageValues;
};

type TMessageValues = Record<
  string,
  React.ReactNode | PrimitiveType | FormatXMLElementFn<React.ReactNode, React.ReactNode>
>;

export type TMessage = (id: string, values?: TMessageValues) => string;

export type TCurrentLocale = TLocale | null;

export type TLocale = 'ru' | 'en';
