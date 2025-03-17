/**
 * Получить список.
 * @param data Данные.
 * @param list Список.
 * @return Список.
 */
export const getList = <T>(data: Record<string, T>, list: string[]): T[] => list.map((id) => data[id]);
