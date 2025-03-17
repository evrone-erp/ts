import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { issueApi } from 'entities/issue/model/api';
import { TGetUserIssuesParams, TIssue } from 'entities/issue/model/types';
import { uniqArray } from 'shared/lib/utils';

type TIssuesParams = Omit<TGetUserIssuesParams, 'includeIssues' | 'userName'> & {
  userName?: string;
  pinnedIssues: string[];
  issuesFromTracks: string[] | undefined;
};

const emptyArray = [] as never[];
const createSortedIssuesSelector = (pinnedIssues: string[]) =>
  createSelector(
    (state: { data?: TIssue[] }) => state.data ?? emptyArray,
    (issues) =>
      issues?.slice().sort((a, b) => {
        // do not sort issues on client, backend sends issues according to sorting we provided in request.
        // this code puts pinned issues at the top, but doesn't alter their original order
        const aWeight = pinnedIssues.includes(a.key) ? 1 : 0;
        const bWeight = pinnedIssues.includes(b.key) ? 1 : 0;
        return bWeight - aWeight;
      }) ?? emptyArray,
  );

export function useIssuesList(params: TIssuesParams) {
  const { issuesFromTracks, pinnedIssues, userName, ...restParams } = params;
  const { language } = restParams;

  const includeIssues = useMemo(
    () => uniqArray([...(issuesFromTracks ?? []), ...pinnedIssues]),
    [issuesFromTracks, pinnedIssues],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectSortedIssues = useMemo(() => createSortedIssuesSelector(pinnedIssues), []);

  return issueApi.useGetIssuesQuery(
    { ...restParams, userName: userName ?? '', includeIssues },
    {
      skip: !issuesFromTracks || !userName || !language,
      selectFromResult: (state) => ({
        isLoadingIssues: state.isLoading,
        issues: selectSortedIssues(state),
      }),
    },
  );
}
