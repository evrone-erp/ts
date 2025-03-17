import { FC, ReactNode } from 'react';
import { Button } from 'antd';
import { Message } from 'entities/locale/ui/Message';

import styles from './UnauthorizedTracker.module.scss';

type TUnauthorizedTrackerProps = {
  errorMessage: string;
  actions: ReactNode;
  logout?(): void;
};

export const UnauthorizedTracker: FC<TUnauthorizedTrackerProps> = ({ errorMessage, logout, actions }) => (
  <div className={styles.container}>
    <div className={styles.message}>{errorMessage}</div>
    <div>
      {logout && (
        <Button onClick={logout} type="link" size="large">
          <Message id="unauthorizedTracker.changeAccount" />
        </Button>
      )}
      {actions}
    </div>
  </div>
);
