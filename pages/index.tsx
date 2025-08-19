import { OrganizationRoute } from 'entities/organization/ui/OrganizationRoute';
import { IndexPage } from 'pages/Index';
import { ReactElement } from 'react';
import { useMainTracker } from 'entities/tracker/lib/useMainTracker';
import { TAppConfig } from 'shared/lib/types';

export const getServerSideProps = () => ({
  props: {
    isYandexTrackerEnabled: Boolean(process.env.CLIENT_ID),
    isJiraEnabled: Boolean(process.env.JIRA_CLIENT_ID && process.env.JIRA_CLIENT_SECRET),
  },
});

export default (props: TAppConfig): ReactElement => {
  const mainTracker = useMainTracker(props);

  return (
    <OrganizationRoute mainTracker={mainTracker}>
      <IndexPage mainTracker={mainTracker} />
    </OrganizationRoute>
  );
};
