import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryError = (x: unknown): x is FetchBaseQueryError => !!x && Object.hasOwn(x, 'status');
