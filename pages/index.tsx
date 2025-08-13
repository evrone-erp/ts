import { OrganizationRoute } from 'entities/organization/ui/OrganizationRoute';
import { IndexPage } from 'pages/Index';
import { ReactElement } from 'react';

export default (): ReactElement => (
  <OrganizationRoute>
    <IndexPage />
  </OrganizationRoute>
);
