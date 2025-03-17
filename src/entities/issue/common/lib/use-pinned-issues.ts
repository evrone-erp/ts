import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import { uniqArray } from 'shared/lib/utils';
import { PINNED_ISSUES_STORAGE_KEY } from 'entities/issue/common/lib/constants';

export const usePinnedIssues = (key: string) => {
  const [pinnedIssues = {}, setPinnedIssues] = useLocalStorage<Record<string, string[]>>(PINNED_ISSUES_STORAGE_KEY);

  useEffect(() => {
    if (key && !(key in pinnedIssues)) {
      setPinnedIssues({
        ...pinnedIssues,
        [key]: [],
      });
    }
  }, [key, pinnedIssues, setPinnedIssues]);

  const pinnedIssuesByOrg = useMemo(() => (key ? pinnedIssues[key] ?? [] : []), [key, pinnedIssues]);

  const handleAddPinnedIssue = useCallback(
    (issueKey: string) => {
      if (key) {
        setPinnedIssues({
          ...pinnedIssues,
          [key]: uniqArray([...pinnedIssuesByOrg, issueKey]),
        });
      }
    },
    [key, pinnedIssues, pinnedIssuesByOrg, setPinnedIssues],
  );

  const handleRemovePinnedIssue = useCallback(
    (issueKey: string) => {
      if (key) {
        setPinnedIssues({
          ...pinnedIssues,
          [key]: pinnedIssuesByOrg.filter((issue) => issue !== issueKey),
        });
      }
    },
    [key, pinnedIssues, pinnedIssuesByOrg, setPinnedIssues],
  );

  return {
    pinnedIssues: pinnedIssuesByOrg,
    pinIssue: handleAddPinnedIssue,
    unpinIssue: handleRemovePinnedIssue,
  };
};
