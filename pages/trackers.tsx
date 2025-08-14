import { TrackersPage } from 'pages/Trackers';
import { TTrackersPageProps } from 'pages/Trackers/TrackersPage';

export const getServerSideProps = () => ({
  props: {
    isYandexTrackerEnabled: Boolean(process.env.CLIENT_ID),
    isJiraEnabled: Boolean(process.env.JIRA_CLIENT_ID && process.env.JIRA_CLIENT_SECRET),
  },
});

export default (props: TTrackersPageProps) => <TrackersPage {...props} />;
