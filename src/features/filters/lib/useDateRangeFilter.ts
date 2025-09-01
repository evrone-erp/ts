import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { DateWrapper } from 'features/date/lib/DateWrapper';

export const useDateRangeFilter = (utcOffsetInMinutes: number | undefined) => {
  const router = useRouter();

  const { defaultFrom, defaultTo } = useMemo(
    () => ({
      defaultFrom: DateWrapper.getDate({ utcOffsetInMinutes }).startOf('month').format(),
      defaultTo: DateWrapper.getDate({ utcOffsetInMinutes }).endOf('month').format(),
    }),
    [utcOffsetInMinutes],
  );

  const from = (router.query.from as string) || defaultFrom;
  const to = (router.query.to as string) || defaultTo;

  const { fromTimestamp, toTimestamp } = useMemo(
    () => ({
      fromTimestamp: new Date(from).valueOf(),
      toTimestamp: new Date(to).valueOf(),
    }),
    [from, to],
  );

  return {
    from,
    to,
    fromTimestamp,
    toTimestamp,
  };
};
