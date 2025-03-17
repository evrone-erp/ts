import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import { Button, Input, Space } from 'antd';
import { useAppDispatch } from 'shared/lib/hooks';
import { useMessage } from 'entities/locale/lib/hooks';

import { getDefaultTracker } from 'entities/tracker/lib/getDefaultTracker';
import { trackers } from 'entities/tracker/model/reducers';
import styles from './EmptyYandexOrganization.module.scss';

export const EmptyYandexOrganization: FC = () => {
  const [orgId, setOrgId] = useState('');
  const dispatch = useAppDispatch();
  const message = useMessage();

  const handleChangeOrgId: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setOrgId(e.target.value);
  }, []);

  const handleSaveOrgId = useCallback(() => {
    const defaultTracker = getDefaultTracker(orgId);
    dispatch(trackers.actions.upsertTracker({ nextTracker: defaultTracker }));
    dispatch(trackers.actions.setMainTracker({ id: defaultTracker.id }));
  }, [orgId, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <p>
          {message('organiztions.emptyOrganization.message')}{' '}
          <a href="https://tracker.yandex.com/admin/orgs" target="_blank" rel="noreferrer">
            {message('organiztions.emptyOrganization.link')}
          </a>
        </p>
      </div>
      <Space.Compact>
        <Input
          className={styles.input}
          placeholder={message('organiztions.emptyOrganization.inputPlaceholder')}
          onChange={handleChangeOrgId}
        />
        <Button type="primary" onClick={handleSaveOrgId} disabled={!orgId}>
          {message('organiztions.emptyOrganization.save')}
        </Button>
      </Space.Compact>
    </div>
  );
};
