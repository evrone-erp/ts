import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { isFetchBaseQueryError } from 'shared/lib/isFetchBaseQueryError';

export const getQueryErrorStatus = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if (!isFetchBaseQueryError(error)) {
    return undefined;
  }

  if (typeof error.status === 'number') {
    return error.status;
  }

  if (error.status === 'PARSING_ERROR') {
    return error.originalStatus;
  }

  return undefined;
};
