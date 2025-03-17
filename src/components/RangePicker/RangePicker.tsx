import type { RangePickerProps } from 'antd/lib/date-picker';
import { DatePicker } from 'antd';
import styles from './RangePicker.module.scss';

export const RangePicker = (props: RangePickerProps) => (
  <div className={styles.wrapper}>
    <DatePicker.RangePicker {...props} getPopupContainer={(trigger) => trigger} />
  </div>
);
