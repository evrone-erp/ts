import React, { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { selectCurrentOrgId } from 'entities/organization/model/selectors';
import { EmptyOrganization } from 'entities/organization/ui/EmptyOrganization';
import { CURRENT_ORG_ID_STORAGE_KEY } from 'entities/organization/model/constants';
import { actionOrganizationSetCurrentOrgId } from 'entities/organization/model/actions';

export const OrganizationRoute = ({ children }: PropsWithChildren) => {
  const persistedCurrentOrgId = localStorage.getItem(CURRENT_ORG_ID_STORAGE_KEY);
  const currentOrgId = useAppSelector(selectCurrentOrgId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (persistedCurrentOrgId) {
      dispatch(actionOrganizationSetCurrentOrgId(persistedCurrentOrgId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentOrgId) {
    return <EmptyOrganization />;
  }

  return <>{children}</>;
};
