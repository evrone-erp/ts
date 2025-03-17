import { TGetEntry, TGetId, TGetList } from 'shared/lib/types';

/**
 * Получить идентификатор.
 * @param key Свойство.
 * @return Идентификатор.
 */
export const getId =
  <T>(key: keyof T): TGetId<T> =>
  (item) =>
    `${item[key]}`;

/**
 * Получить данные.
 * @param getEntryId Получить идентификатор.
 * @return данные.
 */
export const getEntries =
  <T>(getEntryId: TGetId<T>): TGetEntry<T> =>
  (item) => [getEntryId(item), item];

export const normalize =
  <T>(getEntryId: TGetId<T>): TGetList<T> =>
  (list: T[]) => ({
    data: Object.fromEntries(list.map(getEntries(getEntryId))),
    list: list.map(getEntryId),
  });
