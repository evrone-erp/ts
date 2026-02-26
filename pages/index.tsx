import { OrganizationRoute } from 'entities/organization/ui/OrganizationRoute';
import { IndexPage } from 'pages/Index';
import type { ReactElement } from 'react';
import { useMainTracker } from 'entities/tracker/lib/useMainTracker';
import type { TAppConfig } from 'shared/lib/types';

export const getServerSideProps = () => ({
  props: {
    isYandexTrackerEnabled: Boolean(process.env.CLIENT_ID),
    isJiraEnabled: Boolean(process.env.JIRA_CLIENT_ID && process.env.JIRA_CLIENT_SECRET),
  },
});

const Index = (props: TAppConfig): ReactElement => {
  const mainTracker = useMainTracker(props);

  return (
    <OrganizationRoute mainTracker={mainTracker}>
      <IndexPage mainTracker={mainTracker} />
    </OrganizationRoute>
  );
};

export default Index;
