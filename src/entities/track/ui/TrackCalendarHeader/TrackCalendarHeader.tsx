import { Button, Col, Row, Space, Spin } from 'antd';
import { LocaleSelector } from 'entities/locale/ui/LocaleSelector';
import { Message } from 'entities/locale/ui/Message';
import { logout } from 'entities/auth/lib/helpers';
import { TrackTimeButton } from 'entities/track/ui/TrackCalendarHeader/TrackTimeButton';
import { IssueStatusSelect } from 'entities/issue/ui/IssueStatusSelect/IssueStatusSelect';
import { IssueSummarySearch } from 'entities/issue/ui/IssueSummarySearch/IssueSummarySearch';
import { useFilters } from 'features/filters/lib/useFilters';
import { QueueSelect } from 'entities/queue/ui/QueueSelect/QueueSelect';
import { TimeOffsetSelect } from 'features/date/ui/TimeOffsetSelect/TimeOffsetSelect';
import { TimePeriodStepper } from './TimePeriodStepper';
import { TodayText } from './TodayText';
import { TrackCalendarHeaderControlBar } from './TrackCalendarHeaderControlBar';
import { UserSelect } from './UserSelect';

import styles from './TrackCalendarHeader.module.scss';

interface ITrackCalendarHeaderProps {
  userId?: string;
  isFetching?: boolean;
  isEdit?: boolean;
}

export function TrackCalendarHeader({ userId, isFetching, isEdit }: ITrackCalendarHeaderProps) {
  const { issueStatus, updateIssueStatus, summary, updateSummary, queue, updateQueue } = useFilters();

  return (
    <div className={styles.header}>
      <TrackTimeButton className={styles.addTrackBtn} isEdit={isEdit} />
      <Row justify="space-between">
        <Col>
          <TodayText />
        </Col>

        <Col>
          <Space>
            <Button onClick={logout} type="link">
              <Message id="home.logout" />
            </Button>
            <LocaleSelector />
            <TimeOffsetSelect />
          </Space>
        </Col>
      </Row>

      <Row className={styles.durationRow}>
        <Col flex="auto">
          <TimePeriodStepper loader={isFetching && <Spin size="small" />} />
        </Col>
      </Row>

      <TrackCalendarHeaderControlBar>
        <UserSelect userId={userId} />
        <IssueStatusSelect onChange={updateIssueStatus} value={issueStatus} />
        <QueueSelect value={queue} onChange={updateQueue} />
        <IssueSummarySearch defaultValue={summary} onSearch={updateSummary} />
      </TrackCalendarHeaderControlBar>
    </div>
  );
}
