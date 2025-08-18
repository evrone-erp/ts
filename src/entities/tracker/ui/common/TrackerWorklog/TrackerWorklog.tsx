import { isJiraTrackerCfg, isYandexTrackerCfg, TTrackerConfig } from 'entities/tracker/model/types';
import { useRouter } from 'next/router';
import { Head } from 'widgets/Head';
import { useMessage } from 'entities/locale/lib/hooks';
import { Layout } from 'widgets/Layout';
import { useAppSelector } from 'shared/lib/hooks';
import { selectLocaleCurrent } from 'entities/locale/model/selectors';
import { YandexAuthorizedTimesheet } from 'entities/track/yandex/ui/YandexAuthorizedTimesheet/YandexAuthorizedTimesheet';
import { YandexAuthRoute } from 'entities/auth/ui/yandex/YandexAuthRoute/YandexAuthRoute';
import { JiraAuthorizedTimesheet } from 'entities/track/jira/ui/JiraAuthorizedTimesheet/JiraAuthorizedTimesheet';
import { JiraAuthRoute } from 'entities/auth/ui/jira/JiraAuthRoute/JiraAuthRoute';
import { appPaths } from 'shared/config/constants';

type TProps = {
  tracker: TTrackerConfig | undefined;
};

export const TrackerWorklog = ({ tracker }: TProps) => {
  const { push } = useRouter();

  const message = useMessage();
  const language = useAppSelector(selectLocaleCurrent);

  let renderedTracker;
  if (isYandexTrackerCfg(tracker)) {
    renderedTracker = (
      <YandexAuthRoute tracker={tracker}>
        <YandexAuthorizedTimesheet language={language} tracker={tracker} />
      </YandexAuthRoute>
    );
  } else if (isJiraTrackerCfg(tracker)) {
    renderedTracker = (
      <JiraAuthRoute tracker={tracker}>
        <JiraAuthorizedTimesheet language={language} tracker={tracker} />
      </JiraAuthRoute>
    );
  }

  if (!renderedTracker) {
    push(appPaths.trackers);
    return null;
  }

  return (
    <Layout head={<Head description={message('home.description')} title={tracker?.name ?? 'No tracker found'} />}>
      {renderedTracker}
    </Layout>
  );
};
