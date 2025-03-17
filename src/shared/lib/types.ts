import type { store } from 'app/store';
import { ReactNode } from 'react';

export type TGetId<T> = (item: T) => string;

export type TGetEntry<T> = (item: T) => [string, T];

export type TGetList<T> = (list: T[]) => {
  data: Record<string, T>;
  list: string[];
};

export type TEntityShort = {
  display: string;
  id: string;
  self: string;
};

export type TEntityShortKey = TEntityShort & {
  key: string;
};

export type TSortOrder = 'ASC' | 'DESC';

/*
 * Специально не предоставляют информации о типах, что бы ограничить доспут к состоянию разных модулей
 * */
export type TAppDispatch = typeof store.dispatch;
export type TAppState<T extends string = string, V = unknown> = Record<T, V>;
export type TGetState<T extends string = string, V = unknown> = () => TAppState<T, V>;

export type TPagination = {
  page?: number;
  perPage?: number;
};

export type TOption<TExtra = never> = {
  label: string | ReactNode;
  value: string;
  extra?: TExtra;
};
