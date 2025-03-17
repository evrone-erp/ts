import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { yandexIssueApi } from 'entities/issue/yandex/model/yandex-api';
import { TYandexIssue } from 'entities/issue/yandex/model/types';
import { uniqArray } from 'shared/lib/utils';
import { TYandexTrackerConfig } from 'entities/tracker/model/types';
import { TGetUserIssuesParams } from 'entities/issue/common/model/types';
import { sortWithPinedIssues } from 'entities/issue/common/lib/sortWithPinedIssues';

type TIssuesParams = Omit<TGetUserIssuesParams, 'includeIssues' | 'user'> & {
  user?: string | number;
  pinnedIssues: string[];
  issuesFromTracks: string[] | undefined;
  tracker: TYandexTrackerConfig;
};

const emptyArray = [] as never[];
const createSortedIssuesSelector = (pinnedIssues: string[]) =>
  createSelector(
    (state: { data?: TYandexIssue[] }) => state.data ?? emptyArray,
    (issues) => issues?.toSorted(sortWithPinedIssues(pinnedIssues)) ?? emptyArray,
  );

export function useIssuesList(params: TIssuesParams) {
  const { issuesFromTracks, pinnedIssues, user, ...restParams } = params;
  const { language } = restParams;

  const includeIssues = useMemo(
    () => uniqArray([...(issuesFromTracks ?? []), ...pinnedIssues]),
    [issuesFromTracks, pinnedIssues],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectSortedIssues = useMemo(() => createSortedIssuesSelector(pinnedIssues), []);

  return yandexIssueApi.useGetYandexIssuesQuery(
    { ...restParams, user: user ?? '', includeIssues },
    {
      skip: !issuesFromTracks || !user || !language,
      selectFromResult: (state) => ({
        isLoadingIssues: state.isLoading,
        issues: selectSortedIssues(state),
      }),
    },
  );
}
