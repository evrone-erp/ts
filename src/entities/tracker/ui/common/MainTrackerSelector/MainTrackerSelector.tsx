import { useAppSelector } from 'shared/lib/hooks';
import { selectTrackers } from 'entities/tracker/model/selectors';
import { Select, Typography } from 'antd';
import { useMemo } from 'react';
import { TOption } from 'shared/lib/types';
import { isYandexTrackerCfg, TTrackerConfig } from 'entities/tracker/model/types';
import { Yandex360 } from 'components/Icons/Yandex360';
import { YandexCloud } from 'components/Icons/YandexCloud';
import { useDispatch } from 'react-redux';
import { trackers } from 'entities/tracker/model/reducers';
import { Jira } from 'components/Icons/Jira';
import { Message } from 'entities/locale/ui/Message';
import styles from './MainTrackerSelector.module.scss';

export const MainTrackerSelector = ({ filteredTrackers }: { filteredTrackers: TTrackerConfig[] }) => {
  const dispatch = useDispatch();
  const { mainTrackerId } = useAppSelector(selectTrackers);
  const value = filteredTrackers.findIndex(({ id }) => id === mainTrackerId) > -1 ? mainTrackerId : undefined;

  const options = useMemo(() => {
    const res: TOption[] = [];
    for (const tracker of Object.values(filteredTrackers)) {
      res.push({
        label: (
          <div className={styles.label}>
            {isYandexTrackerCfg(tracker) ? <>{tracker.isCloud ? <YandexCloud /> : <Yandex360 />}</> : <Jira />}
            <span>{tracker.name}</span>
          </div>
        ),
        value: tracker.id,
      });
    }

    return res;
  }, [filteredTrackers]);

  const onChange = (_: unknown, option?: TOption | TOption[]) => {
    if (option && !Array.isArray(option)) {
      dispatch(
        trackers.actions.setMainTracker({
          id: option.value,
        }),
      );
    }
  };

  return (
    <section>
      <Typography.Title level={2}>
        <Message id="trackers.configuration.main.title" />
      </Typography.Title>
      <Select options={options} onChange={onChange} value={value} className={styles.selector} />
    </section>
  );
};
