import { AuthRoute } from 'entities/auth/ui/AuthRoute';
import { OrganizationRoute } from 'entities/organization/ui/OrganizationRoute';
import { IndexPage } from 'pages/Index';

export default (): JSX.Element => (
  <AuthRoute>
    <OrganizationRoute>
      <IndexPage />
    </OrganizationRoute>
  </AuthRoute>
);
