import { organization } from 'entities/organization/model/reducers';
import { apiHeaders } from 'shared/api/api-base-query';
import { TAppDispatch } from 'shared/lib/types';
import { CURRENT_ORG_ID_STORAGE_KEY } from './constants';

export const actionOrganizationSetCurrentOrgId = (currentOrgId: string) => (dispatch: TAppDispatch) => {
  apiHeaders.setCurrentOrgId(currentOrgId);

  try {
    localStorage.setItem(CURRENT_ORG_ID_STORAGE_KEY, currentOrgId);
  } catch (e) {
    console.error(e);
  }

  dispatch(organization.actions.setCurrentOrgId(currentOrgId));
};

export const actionOrganizationRemoveCurrentOrgId = () => (dispatch: TAppDispatch) => {
  apiHeaders.removeCurrentOrgId();

  try {
    localStorage.removeItem(CURRENT_ORG_ID_STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }

  dispatch(organization.actions.removeCurrentOrgId());
};
