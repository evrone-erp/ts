import { TIssueStatus } from 'entities/issue/model/types';
import styles from './IssueStatusBadge.module.scss';

interface IIssueStatusBadgeProps {
  status: TIssueStatus;
}

export const IssueStatusBadge = ({ status }: IIssueStatusBadgeProps) => (
  <div className={styles.badge} data-key={status.key}>
    {status.display}
  </div>
);
