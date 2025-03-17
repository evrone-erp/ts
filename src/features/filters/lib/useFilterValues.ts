import { useDateRangeFilter } from 'features/filters/lib/useDateRangeFilter';
import { useUserIdFilter } from 'features/filters/lib/useUserIdFilter';
import { useShowWeekends } from 'features/filters/lib/useShowWeekends';
import { useIssueStatusFilter } from 'features/filters/lib/useIssueStatusFilter';
import { useSorting } from 'features/filters/lib/useSorting';
import { useSummaryFilter } from 'features/filters/lib/useSummaryFilter';
import { useQueueFilter } from 'features/filters/lib/useQueueFilter';
import { useTimeOffsetFilter } from 'features/filters/lib/useTimeOffsetFilter';

export const useFilterValues = () => {
  const utcOffsetInMinutes = useTimeOffsetFilter();
  const { from, to, fromTimestamp, toTimestamp } = useDateRangeFilter(utcOffsetInMinutes);
  const userId = useUserIdFilter();
  const showWeekends = useShowWeekends();
  const issueStatus = useIssueStatusFilter();
  const summary = useSummaryFilter();
  const queue = useQueueFilter();
  const sorting = useSorting();

  return {
    from,
    to,
    fromTimestamp,
    toTimestamp,
    userId,
    showWeekends,
    issueStatus,
    summary,
    queue,
    sorting,
    utcOffsetInMinutes,
  };
};
