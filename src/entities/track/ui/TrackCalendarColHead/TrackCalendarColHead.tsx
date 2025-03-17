import { Text } from 'components';
import { isRuLocale } from 'entities/locale/lib/helpers';
import { useCurrentLocale } from 'entities/locale/lib/hooks';
import { DATE_FORMAT_MONTH } from 'features/date/lib/constants';
import { DateWrapper, TDate } from 'features/date/lib/DateWrapper';
import React, { useMemo } from 'react';
import { useFilterValues } from 'features/filters/lib/useFilterValues';
import { clsx } from 'clsx';
import styles from './TrackCalendarColHead.module.scss';

type TProps = {
  date: string;
  now: TDate;
};

export const TrackCalendarColHead = ({ date, now }: TProps) => {
  const currentLocale = useCurrentLocale();
  const { utcOffsetInMinutes } = useFilterValues();

  const dateObj = useMemo(() => DateWrapper.getDate({ date, utcOffsetInMinutes }), [date, utcOffsetInMinutes]);

  const dateFormat = useMemo(() => DateWrapper.getDateFormat(dateObj, DATE_FORMAT_MONTH), [dateObj]);
  const dayFormat = useMemo(
    () => DateWrapper.getDateFormat(dateObj, isRuLocale(currentLocale) ? 'dd' : 'ddd'),
    [dateObj, currentLocale],
  );

  const isSamePeriod = useMemo(() => now.isSame(date, 'day'), [now, date]);

  const isWeekend = useMemo(() => DateWrapper.isWeekend(dateObj), [dateObj]);

  return (
    <th className={clsx(styles.col, { [styles.col_weekend]: isWeekend })} data-current={isSamePeriod}>
      <div>
        <Text fs={13} fw={700} style={{ textTransform: 'capitalize' }}>
          {dayFormat}
        </Text>
      </div>
      <div>
        <Text fs={13}>{dateFormat}</Text>
      </div>
    </th>
  );
};
