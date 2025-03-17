import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useTimeOffsetFilter = () => {
  const router = useRouter();

  const timeOffsetQuery = router.query.time_offset as string | undefined;

  const timeOffset = useMemo(() => {
    const parsedInt = parseInt(timeOffsetQuery ?? '', 10);
    return Number.isNaN(parsedInt) ? undefined : parsedInt;
  }, [timeOffsetQuery]);

  return timeOffset;
};
