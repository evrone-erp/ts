import type { DatePickerProps } from 'antd';
import { DatePicker as AntDatePicked } from 'antd';
import styles from './DatePicker.module.scss';

export const DatePicker = (props: DatePickerProps) => (
  <div className={styles.wrapper}>
    <AntDatePicked {...props} />
  </div>
);
