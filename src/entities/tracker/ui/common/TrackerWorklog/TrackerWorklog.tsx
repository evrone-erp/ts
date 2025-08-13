import { isJiraTrackerCfg, isYandexTrackerCfg, TTrackerConfig } from 'entities/tracker/model/types';
import { Head } from 'widgets/Head';
import { useMessage } from 'entities/locale/lib/hooks';
import { Layout } from 'widgets/Layout';
import { useAppSelector } from 'shared/lib/hooks';
import { selectLocaleCurrent } from 'entities/locale/model/selectors';
import { YandexAuthorizedTimesheet } from 'entities/track/yandex/ui/YandexAuthorizedTimesheet/YandexAuthorizedTimesheet';
import { YandexAuthRoute } from 'entities/auth/ui/yandex/YandexAuthRoute/YandexAuthRoute';
import { JiraAuthorizedTimesheet } from 'entities/track/jira/ui/JiraAuthorizedTimesheet/JiraAuthorizedTimesheet';
import { JiraAuthRoute } from 'entities/auth/ui/jira/JiraAuthRoute/JiraAuthRoute';

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
      <YandexAuthRoute tracker={tracker}>
        <YandexAuthorizedTimesheet
          language={language}
          tracker={tracker}
          unauthorizedErrorShouldAppearAsOrgChange={unauthorizedErrorShouldAppearAsOrgChange}
        />
      </YandexAuthRoute>
    );
  } else if (isJiraTrackerCfg(tracker)) {
    renderedTracker = (
      <JiraAuthRoute tracker={tracker}>
        <JiraAuthorizedTimesheet language={language} tracker={tracker} />
      </JiraAuthRoute>
    );
  }

  return (
    <Layout head={<Head description={message('home.description')} title={tracker?.name ?? 'No tracker found'} />}>
      {renderedTracker}
    </Layout>
  );
};
