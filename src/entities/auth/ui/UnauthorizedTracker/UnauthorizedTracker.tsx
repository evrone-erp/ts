import { FC, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { logout } from 'entities/auth/lib/helpers';
import { Message } from 'entities/locale/ui/Message';
import { actionOrganizationRemoveCurrentOrgId } from 'entities/organization/model/actions';
import { useAppDispatch } from 'shared/lib/hooks';

import styles from './UnauthorizedTracker.module.scss';

type TUnauthorizedTrackerProps = {
  status: 401 | 403;
};

export const UnauthorizedTracker: FC<TUnauthorizedTrackerProps> = ({ status }) => {
  const dispatch = useAppDispatch();

  const errorMessage = useMemo(() => {
    if (status === 401) {
      return <Message id="unauthorizedTracker.noAccess.message" />;
    }

    return <Message id="unauthorizedTracker.notExist.message" />;
  }, [status]);

  const handleResetCurrentOrgId = useCallback(() => {
    dispatch(actionOrganizationRemoveCurrentOrgId());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.message}>{errorMessage}</div>
      <div>
        <Button onClick={logout} type="link" size="large">
          <Message id="unauthorizedTracker.changeAccount" />
        </Button>
        <Button onClick={handleResetCurrentOrgId} type="link" size="large">
          <Message id="unauthorizedTracker.changeOrgId" />
        </Button>
      </div>
    </div>
  );
};
