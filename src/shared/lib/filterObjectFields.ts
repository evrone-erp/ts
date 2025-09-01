/**
 * removes fields with values "undefined" or "null" from object
 */
export const filterObjectFields = <T extends Record<string, unknown>>(obj: T): T =>
  Object.entries(obj).reduce((acc: T, [key, value]) => {
    if (value === undefined || value === null) {
      return acc;
    }

    (acc as Record<string, unknown>)[key] = value;

    return acc;
  }, {} as T);
