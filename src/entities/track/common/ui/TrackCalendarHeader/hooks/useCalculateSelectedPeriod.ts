import { useMemo } from 'react';
import { TDate } from 'features/date/lib/DateWrapper';

export const useCalculateSelectedPeriod = (from: TDate, to: TDate) =>
  useMemo(() => {
    const startOfFrom = from.startOf('day');
    const startOfTo = to.startOf('day');

    if (startOfFrom.add(1, 'months').subtract(1, 'day').isSame(startOfTo)) {
      return 'month' as const;
    }
    if (startOfFrom.add(6, 'days').isSame(startOfTo)) {
      return 'week' as const;
    }

    return 'period' as const;
  }, [from, to]);
