import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { isFetchBaseQueryError } from 'shared/lib/isFetchBaseQueryError';

export const isQueryErrorStatusInSet = (
  error: FetchBaseQueryError | SerializedError | undefined,
  statusSet: Set<number>,
) => {
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
