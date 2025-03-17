import { useRouter } from 'next/router';
import { useMessage } from 'entities/locale/lib/hooks';
import { useDispatch } from 'react-redux';
import { trackers } from 'entities/tracker/model/reducers';
import { isQueryErrorStatusInSet } from 'shared/lib/isQueryErrorStatusInSet';
import { UnauthorizedTracker } from 'entities/auth/ui/UnauthorizedTracker/UnauthorizedTracker';
import { getQueryErrorStatus } from 'shared/lib/getQueryErrorStatus';
import { Button } from 'antd';
import { Message } from 'entities/locale/ui/Message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { TTrackerConfig } from 'entities/tracker/model/types';
import { CURRENT_ORG_ID_STORAGE_KEY } from 'entities/organization/model/constants';

const unautharizedErrors = new Set([401, 403]);

export const useUnauthorizedTracker = (
  errorSelf: FetchBaseQueryError | SerializedError | undefined,
  tracker: TTrackerConfig,
  logout?: () => void,
  resetMainTracker: boolean = false,
) => {
  const router = useRouter();
  const message = useMessage();
  const dispatch = useDispatch();

  const onBadConfig = () => {
    if (resetMainTracker) {
      // this will be equivalent to old approach - resetting Org ID
      dispatch(trackers.actions.resetMainTracker());
      // also just in case delete ID from local storage, like we did prior to changes
      localStorage.removeItem(CURRENT_ORG_ID_STORAGE_KEY);
    } else {
      // otherwise just redirect to tracker config
      router.push({ pathname: '/trackers', query: { editType: tracker.type, editId: tracker.id } });
    }
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
            <Message id={resetMainTracker ? 'unauthorizedTracker.changeOrgId' : 'unauthorizedTracker.changeConfig'} />
          </Button>
        }
      />
    );
  }

  return undefined;
};
