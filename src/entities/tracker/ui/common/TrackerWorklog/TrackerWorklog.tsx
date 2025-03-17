import { isJiraTrackerCfg, isYandexTrackerCfg, TTrackerConfig } from 'entities/tracker/model/types';
import { Head } from 'widgets/Head';
import { useMessage } from 'entities/locale/lib/hooks';
import { Layout } from 'widgets/Layout';
import { useAppSelector } from 'shared/lib/hooks';
import { selectLocaleCurrent } from 'entities/locale/model/selectors';
import { YandexAuthorizedTimesheet } from 'entities/track/yandex/ui/YandexAuthorizedTimesheet/YandexAuthorizedTimesheet';
import { AuthRoute } from 'entities/auth/ui/AuthRoute';
import { JiraAuthorizedTimesheet } from 'entities/track/jira/ui/JiraAuthorizedTimesheet/JiraAuthorizedTimesheet';

type TProps = {
  tracker: TTrackerConfig | undefined;
  unauthorizedErrorShouldAppearAsOrgChange?: boolean;
};

export const TrackerWorklog = ({ tracker, unauthorizedErrorShouldAppearAsOrgChange = false }: TProps) => {
  const message = useMessage();
  const language = useAppSelector(selectLocaleCurrent);

  let renderedTracker = <span>No such tracker</span>;
  if (isYandexTrackerCfg(tracker)) {
    renderedTracker = (
      <AuthRoute tracker={tracker}>
        <YandexAuthorizedTimesheet
          language={language}
          tracker={tracker}
          unauthorizedErrorShouldAppearAsOrgChange={unauthorizedErrorShouldAppearAsOrgChange}
        />
      </AuthRoute>
    );
  } else if (isJiraTrackerCfg(tracker)) {
    renderedTracker = <JiraAuthorizedTimesheet language={language} tracker={tracker} />;
  }

  return (
    <Layout head={<Head description={message('home.description')} title={tracker?.name ?? 'No tracker found'} />}>
      {renderedTracker}
    </Layout>
  );
};
