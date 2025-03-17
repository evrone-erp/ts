import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import { Button, Input, Space } from 'antd';
import { useAppDispatch } from 'shared/lib/hooks';
import { actionOrganizationSetCurrentOrgId } from 'entities/organization/model/actions';
import { useMessage } from 'entities/locale/lib/hooks';

import styles from './EmptyOrganization.module.scss';

export const EmptyOrganization: FC = () => {
  const [orgId, setOrgId] = useState('');
  const dispatch = useAppDispatch();
  const message = useMessage();

  const handleChangeOrgId: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setOrgId(e.target.value);
  }, []);

  const handleSaveOrgId = useCallback(() => {
    dispatch(actionOrganizationSetCurrentOrgId(orgId));
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
