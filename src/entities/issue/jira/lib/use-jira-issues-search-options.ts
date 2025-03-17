import { useMemo } from 'react';
import { useDebouncedState } from 'shared/lib/useDebouncedState';
import { useInitialValue } from 'shared/lib/useInitialValue';
import { TTrackerConfig } from 'entities/tracker/model/types';
import { TOption } from 'shared/lib/types';
import { getOptionFromIssue } from 'entities/issue/common/lib/get-option-from-issue';
import { jiraIssueApi } from 'entities/issue/jira/model/jira-api';

const emptyArray: TOption[] = [];

export const useJiraIssuesSearchOptions = (tracker: TTrackerConfig, value: string | undefined) => {
  const [search, setSearch, isDebouncingSearch] = useDebouncedState('');
  const initialIssueKey = useInitialValue(value);

  const { currentData: issueList, isFetching: isFetchingIssues } = jiraIssueApi.useGetJiraIssuesQuery(
    { search, utcOffsetInMinutes: undefined, tracker },
    { skip: !search },
  );
  const { currentData: initialIssue, isFetching: isFetchingIssue } = jiraIssueApi.useGetJiraIssueQuery(
    { issueIdOrKey: initialIssueKey ?? '', tracker },
    { skip: !initialIssueKey },
  );

  const foundIssuesAsOptions = useMemo(() => issueList?.map(getOptionFromIssue) ?? emptyArray, [issueList]);

  const initialIssueAsOptions = useMemo(
    () => (initialIssue ? [getOptionFromIssue(initialIssue)] : emptyArray),
    [initialIssue],
  );

  return {
    isFetching: isFetchingIssues || isFetchingIssue || isDebouncingSearch,
    options: search ? foundIssuesAsOptions : initialIssueAsOptions,
    onSearch: setSearch,
  };
};
