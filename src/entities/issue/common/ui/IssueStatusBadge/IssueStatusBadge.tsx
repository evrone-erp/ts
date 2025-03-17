import styles from 'entities/issue/common/ui/IssueStatusBadge/IssueStatusBadge.module.scss';
import { TIssueStatus } from 'entities/issue/common/model/types';

interface IIssueStatusBadgeProps {
  status: TIssueStatus;
}

export const IssueStatusBadge = ({ status }: IIssueStatusBadgeProps) => (
  <div className={styles.badge} data-key={status.key}>
    {status.display}
  </div>
);
