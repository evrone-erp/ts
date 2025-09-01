import { Message } from 'entities/locale/ui/Message';
import { memo, useMemo } from 'react';
import { TrackCalendarColHead } from 'entities/track/common/ui/TrackCalendarColHead';
import { Text } from 'components';
import { useMessage } from 'entities/locale/lib/hooks';
import { Button } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { useFilters } from 'features/filters/lib/useFilters';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import styles from './TrackCalendarHead.module.scss';

interface ITrackCalendarHeadProps {
  range: string[];
  sortingKey: string;
}

export const TrackCalendarHead = memo(({ range, sortingKey }: ITrackCalendarHeadProps) => {
  const message = useMessage();
  const { sorting, updateSorting, utcOffsetInMinutes } = useFilters();

  const now = useMemo(() => DateWrapper.getDate({ utcOffsetInMinutes }), [utcOffsetInMinutes]);

  const toggleSorting = () => {
    updateSorting(sortingKey, sorting.sortOrder === 'ASC' ? 'DESC' : 'ASC');
  };

  return (
    <thead className={styles.head}>
      <tr>
        <th className={styles.issueCol} aria-label={message('issue.title')}>
          <Button type="text" onClick={toggleSorting} className={styles.issueSortBtn}>
            <Text fs={13}>
              <Message id="issue.title" />
            </Text>
            {sorting.sortOrder === 'ASC' && <SortAscendingOutlined />}
            {sorting.sortOrder === 'DESC' && <SortDescendingOutlined />}
          </Button>
        </th>

        <th className={styles.statusCol} aria-label={message('issue.item.status')}>
          <div>
            <Text fs={13}>
              <Message id="issue.item.status" />
            </Text>
          </div>
        </th>

        {range.map((date) => (
          <TrackCalendarColHead date={date} key={date} now={now} />
        ))}

        <th className={styles.sumCol} aria-label={message('issue.item.summary')}>
          <Text fs={13}>
            <Message id="issue.item.summary" />
          </Text>
        </th>
      </tr>
    </thead>
  );
});

TrackCalendarHead.displayName = 'TrackCalendarHead';
