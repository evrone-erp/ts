export const batchPromises = async <T, R>(
  list: T[] | undefined,
  limit: number,
  getPromise: (v: T) => Promise<R>,
): Promise<R[]> => {
  const results: R[] = [];

  if (!list) {
    console.error(TypeError('List is undefined'));
    return results;
  }

  for (let i = 0; i < list.length; i += limit) {
    const batchList = [];
    for (let j = 0; j < limit && i + j < list.length; j += 1) {
      batchList.push(list[i + j]);
    }

    // eslint-disable-next-line no-await-in-loop
    const batchResult = await Promise.all(batchList.map((v) => getPromise(v)));

    results.push(...batchResult);
  }
  return results;
};
