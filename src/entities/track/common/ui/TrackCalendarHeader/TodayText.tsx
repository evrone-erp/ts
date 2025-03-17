import { useMessage } from 'entities/locale/lib/hooks';
import { Text } from 'components/';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { useFilterValues } from 'features/filters/lib/useFilterValues';

export function TodayText() {
  const message = useMessage();
  const { utcOffsetInMinutes } = useFilterValues();

  return (
    <Text fs={14} lh={16} fw={700}>
      <span>{message('track.calendar.today')}</span>{' '}
      <span style={{ textTransform: 'capitalize' }}>
        {DateWrapper.getDateFormat(DateWrapper.getDate({ utcOffsetInMinutes }), 'MMMM DD')}
      </span>
    </Text>
  );
}
