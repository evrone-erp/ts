import { FC } from 'react';
import { useMainTracker } from 'entities/tracker/lib/useMainTracker';
import { TrackerWorklog } from 'entities/tracker/ui/common/TrackerWorklog/TrackerWorklog';
import { useUserHasCreatedTrackers } from 'entities/tracker/lib/useUserHasCreatedTrackers';

export const IndexPage: FC = () => {
  const tracker = useMainTracker();

  // assume that if user created new trackers, we don't need to appear as old UX.
  const unauthorizedErrorShouldAppearAsOrgChange = !useUserHasCreatedTrackers();

  return (
    <TrackerWorklog
      tracker={tracker}
      unauthorizedErrorShouldAppearAsOrgChange={unauthorizedErrorShouldAppearAsOrgChange}
    />
  );
};
