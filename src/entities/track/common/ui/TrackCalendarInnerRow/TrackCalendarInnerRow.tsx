import { PropsWithChildren } from 'react';
import styles from './TrackCalendarInnerRow.module.scss';

export const TrackCalendarInnerRow = ({ children }: PropsWithChildren) => <tr className={styles.row}>{children}</tr>;
