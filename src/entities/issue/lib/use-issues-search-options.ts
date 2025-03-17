import { useMemo } from 'react';

import { issueApi } from 'entities/issue/model/api';
import { TIssue } from 'entities/issue/model/types';
import { useDebouncedState } from 'shared/lib/useDebouncedState';
import { useInitialValue } from 'shared/lib/useInitialValue';

type TOption = {
  label: string;
  value: string;
};

const emptyArray: TOption[] = [];

const getOptionFromIssue = ({ key, summary }: TIssue) => ({ label: `${key} - ${summary}`, value: key });

export const useIssuesSearchOptions = (value: string | undefined) => {
  const [search, setSearch, isDebouncingSearch] = useDebouncedState('');
  const initialIssueKey = useInitialValue(value);

  const { currentData: issueList, isFetching: isFetchingIssues } = issueApi.useGetIssuesQuery(
    { search, utcOffsetInMinutes: undefined },
    { skip: !search },
  );
  const { currentData: initialIssue, isFetching: isFetchingIssue } = issueApi.useGetIssueQuery(
    { issueIdOrKey: initialIssueKey ?? '' },
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
