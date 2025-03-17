import { TrackerWorklog } from 'entities/tracker/ui/common/TrackerWorklog/TrackerWorklog';
import { useCurrentPageTracker } from 'entities/tracker/lib/useCurrentPageTracker';

export const TrackerPage = () => {
  const tracker = useCurrentPageTracker();

  return <TrackerWorklog tracker={tracker} />;
};
