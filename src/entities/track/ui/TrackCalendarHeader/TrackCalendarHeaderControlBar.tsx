import { Checkbox, Space, Typography } from 'antd';
import { Text } from 'components';
import { RangePicker } from 'components/RangePicker';
import { Dayjs } from 'dayjs';
import { useMessage } from 'entities/locale/lib/hooks';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import type { RangeValue } from 'rc-picker/lib/interface';
import { memo, PropsWithChildren, useMemo } from 'react';
import { useFilters } from 'features/filters/lib/useFilters';
import { DATE_FORMAT_DATE } from 'features/date/lib/constants';
import styles from './TrackCalendarHeaderControlBar.module.scss';

export const TrackCalendarHeaderControlBar = memo(({ children }: PropsWithChildren) => {
  const message = useMessage();

  const { from, to, showWeekends, updateRangeFilter, updateWeekendVisibility, utcOffsetInMinutes } = useFilters();
  const fromDate = useMemo(() => DateWrapper.getDate({ date: from, utcOffsetInMinutes }), [from, utcOffsetInMinutes]);
  const toDate = useMemo(() => DateWrapper.getDate({ date: to, utcOffsetInMinutes }), [to, utcOffsetInMinutes]);

  const handleDateChange = (dates: RangeValue<Dayjs>) =>
    updateRangeFilter({
      from: dates?.[0] ? DateWrapper.getDateFormat(dates[0].startOf('day')) : undefined,
      to: dates?.[1] ? DateWrapper.getDateFormat(dates[1].endOf('day')) : undefined,
    });

  const handleWeekendsVisibilityChange = () => {
    updateWeekendVisibility(String(Number(!showWeekends)));
  };

  return (
    <Space direction="vertical" size={5} style={{ width: '100%' }}>
      <div className={styles.bar}>
        <RangePicker
          bordered={false}
          allowClear={false}
          value={[fromDate, toDate]}
          onChange={handleDateChange}
          format={DATE_FORMAT_DATE}
        />

        <div className={styles.divider} />

        {children}
      </div>

      <Text fs={13}>
        <Checkbox checked={showWeekends} onChange={handleWeekendsVisibilityChange}>
          <Typography.Text type="secondary">{message('track.calendar.showWeekends')}</Typography.Text>
        </Checkbox>
      </Text>
    </Space>
  );
});
