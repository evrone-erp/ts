import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import { useAppSelector } from 'shared/lib/hooks';
import { selectCurrentOrgId } from 'entities/organization/model/selectors';
import { uniqArray } from 'shared/lib/utils';
import { PINNED_ISSUES_STORAGE_KEY } from './constants';

export const usePinnedIssues = () => {
  const currentOrgId = useAppSelector(selectCurrentOrgId);
  const [pinnedIssues = {}, setPinnedIssues] = useLocalStorage<Record<string, string[]>>(PINNED_ISSUES_STORAGE_KEY);

  useEffect(() => {
    if (currentOrgId && !(currentOrgId in pinnedIssues)) {
      setPinnedIssues({
        ...pinnedIssues,
        [currentOrgId]: [],
      });
    }
  }, [currentOrgId, pinnedIssues, setPinnedIssues]);

  const pinnedIssuesByOrg = useMemo(
    () => (currentOrgId ? (pinnedIssues[currentOrgId] ?? []) : []),
    [currentOrgId, pinnedIssues],
  );

  const handleAddPinnedIssue = useCallback(
    (issueKey: string) => {
      if (currentOrgId) {
        setPinnedIssues({
          ...pinnedIssues,
          [currentOrgId]: uniqArray([...pinnedIssuesByOrg, issueKey]),
        });
      }
    },
    [currentOrgId, pinnedIssues, pinnedIssuesByOrg, setPinnedIssues],
  );

  const handleRemovePinnedIssue = useCallback(
    (issueKey: string) => {
      if (currentOrgId) {
        setPinnedIssues({
          ...pinnedIssues,
          [currentOrgId]: pinnedIssuesByOrg.filter((issue) => issue !== issueKey),
        });
      }
    },
    [currentOrgId, pinnedIssues, pinnedIssuesByOrg, setPinnedIssues],
  );

  return {
    pinnedIssues: pinnedIssuesByOrg,
    pinIssue: handleAddPinnedIssue,
    unpinIssue: handleRemovePinnedIssue,
  };
};
