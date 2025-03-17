import { organization } from 'entities/organization/model/reducers';
import { TOrganizationStore } from 'entities/organization/model/types';
import { TAppState } from 'shared/lib/types';

export const selectCurrentOrgId = (state: TAppState) => (state[organization.name] as TOrganizationStore).currentOrgId;
