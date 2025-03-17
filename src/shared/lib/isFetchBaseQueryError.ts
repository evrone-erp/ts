import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const isFetchBaseQueryError = (x: FetchBaseQueryError | SerializedError | undefined): x is FetchBaseQueryError =>
  !!x && Object.hasOwn(x, 'status');
