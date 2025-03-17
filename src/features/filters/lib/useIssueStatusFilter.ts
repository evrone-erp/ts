import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useIssueStatusFilter = () => {
  const router = useRouter();

  const statusQuery = router.query.status as string | string[] | undefined;

  const status = useMemo(
    () => (Array.isArray(statusQuery) ? statusQuery : [statusQuery].filter(Boolean)),
    [statusQuery],
  );

  return status as string[];
};
