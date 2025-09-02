import { SettingOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import { LocaleSelector } from 'entities/locale/ui/LocaleSelector';
import { TrackTimeButton } from 'entities/track/common/ui/TrackCalendarHeader/TrackTimeButton';
import { TimeOffsetSelect } from 'features/date/ui/TimeOffsetSelect/TimeOffsetSelect';
import { useRouter } from 'next/router';
import { GlobalFetching } from 'shared/ui/GlobalFetching';
import { ReactNode } from 'react';
import { appPaths } from 'shared/config/constants';
import { Text } from 'components';
import { TimePeriodStepper } from './TimePeriodStepper';
import { TodayText } from './TodayText';
import { TrackCalendarHeaderControlBar } from './TrackCalendarHeaderControlBar';

import styles from './TrackCalendarHeader.module.scss';

interface ITrackCalendarHeaderProps {
  isEdit?: boolean;
  upperRowControls?: ReactNode;
  filters?: ReactNode;
  trackerName: string;
}

export function TrackCalendarHeader({ isEdit, trackerName, filters, upperRowControls }: ITrackCalendarHeaderProps) {
  const { push } = useRouter();

  return (
    <div className={styles.header}>
      <Row justify="space-between">
        <Col>
          <Space size="large" wrap align="center">
            <Text fw={500} fs={30} lh={34}>
              {trackerName}
            </Text>
            <TodayText />
            <TrackTimeButton className={styles.addTrackBtn} isEdit={isEdit} />
          </Space>
        </Col>

        <Col>
          <Space>
            {upperRowControls}
            <LocaleSelector />
            <TimeOffsetSelect />
            <Button type="text" icon={<SettingOutlined />} onClick={() => push(appPaths.trackers)} />
          </Space>
        </Col>
      </Row>

      <Row className={styles.durationRow}>
        <Col flex="auto">
          <TimePeriodStepper loader={<GlobalFetching />} />
        </Col>
      </Row>

      <TrackCalendarHeaderControlBar>{filters}</TrackCalendarHeaderControlBar>
    </div>
  );
}
