export function sleep(delay: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
}

export function uniqArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function uniqBy<T extends Record<string, unknown>>(arr: T[], predicate: string | ((arg: T) => T)): T[] {
  const cb = typeof predicate === 'function' ? predicate : (o: T) => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        if (!map.has(key)) map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
}

export const identity = <T>(x: T) => x;
