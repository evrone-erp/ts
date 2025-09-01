import { DateWrapper } from 'features/date/lib/DateWrapper';
import { useMemo } from 'react';
import { formatDateAsTrackKey } from 'entities/track/common/lib/helpers';

export function useRange({
  from,
  showWeekends,
  to,
  utcOffsetInMinutes,
}: {
  from: string;
  to: string;
  showWeekends: boolean;
  utcOffsetInMinutes: number | undefined;
}) {
  const [dateFrom, dateTo] = useMemo(
    () => [
      DateWrapper.getDate({ date: from, utcOffsetInMinutes }),
      DateWrapper.getDate({ date: to, utcOffsetInMinutes }),
    ],
    [from, to, utcOffsetInMinutes],
  );
  return useMemo(() => {
    let dateRange = DateWrapper.getDateRange(dateFrom, dateTo, 'day');
    if (!showWeekends) {
      dateRange = dateRange.filter((date) => !DateWrapper.isWeekend(date));
    }
    return dateRange.map((d) => formatDateAsTrackKey(d));
  }, [dateFrom, dateTo, showWeekends]);
}
