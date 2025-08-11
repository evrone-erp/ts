import { isFetchBaseQueryError } from 'shared/lib/isFetchBaseQueryError';

export const isQueryErrorStatusInSet = (error: unknown, statusSet: Set<number>) => {
  if (!isFetchBaseQueryError(error)) {
    return false;
  }

  if (typeof error.status === 'number') {
    return statusSet.has(error.status);
  }

  if (error.status === 'PARSING_ERROR') {
    return statusSet.has(error.originalStatus);
  }

  return false;
};
