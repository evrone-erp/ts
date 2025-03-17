import { DatePicker as AntDatePicked, DatePickerProps } from 'antd';
import styles from './DatePicker.module.scss';

export const DatePicker = (props: DatePickerProps) => (
  <div className={styles.wrapper}>
    <AntDatePicked {...props} />
  </div>
);
