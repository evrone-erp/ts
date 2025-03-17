import { useAppSelector } from 'shared/lib/hooks';
import { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import type { QueryReturnValue } from '@reduxjs/toolkit/src/query/baseQueryTypes';
import { api } from './api';

export function getTotalPages(response?: Response): number {
  if (!response) return 1;
  return parseInt(response.headers.get('X-Total-Pages') ?? '1', 10);
}

export function useGlobalLoader() {
  return useAppSelector<{ api: ReturnType<typeof api.reducer> }, boolean>((state) => {
    const apiState = state[api.reducerPath];
    return Object.values(apiState.queries).some((query) => query?.status === 'pending');
  });
}

export type TFetchAllPagesBaseQueryResult<T> = Promise<QueryReturnValue<T[], FetchBaseQueryError, FetchBaseQueryMeta>>;

export async function fetchAllPages<T>(fetcher: (page: number) => TFetchAllPagesBaseQueryResult<T>) {
  const reqFetch = async (page: number): TFetchAllPagesBaseQueryResult<T> => {
    const result = await fetcher(page);
    if (result.error) return { error: result.error };
    const totalPages = getTotalPages(result.meta?.response);

    if (page >= totalPages) {
      return { data: result.data };
    }

    const reqResult = await reqFetch(page + 1);

    if (reqResult.error) return { error: reqResult.error };

    return { data: result.data.concat(reqResult.data) };
  };

  const res = await reqFetch(1);
  return res;
}
