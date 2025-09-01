import { useRouter } from 'next/router';
import { useMessage } from 'entities/locale/lib/hooks';
import { isQueryErrorStatusInSet } from 'shared/lib/isQueryErrorStatusInSet';
import { UnauthorizedTracker } from 'entities/auth/ui/common/UnauthorizedTracker/UnauthorizedTracker';
import { getQueryErrorStatus } from 'shared/lib/getQueryErrorStatus';
import { Button } from 'antd';
import { Message } from 'entities/locale/ui/Message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { TTrackerConfig } from 'entities/tracker/model/types';

const unautharizedErrors = new Set([401, 403]);

export const useUnauthorizedTracker = (
  errorSelf: FetchBaseQueryError | SerializedError | undefined,
  tracker: TTrackerConfig,
  logout?: () => void,
) => {
  const router = useRouter();
  const message = useMessage();

  const onBadConfig = () => {
    router.push({ pathname: '/trackers', query: { editType: tracker.type, editId: tracker.id } });
  };

  if (isQueryErrorStatusInSet(errorSelf, unautharizedErrors)) {
    return (
      <UnauthorizedTracker
        errorMessage={
          getQueryErrorStatus(errorSelf) === 401
            ? message('unauthorizedTracker.noAccess.message')
            : message('unauthorizedTracker.notExist.message')
        }
        logout={logout}
        actions={
          <Button onClick={onBadConfig} type="link" size="large">
            <Message id="unauthorizedTracker.changeConfig" />
          </Button>
        }
      />
    );
  }

  return undefined;
};
