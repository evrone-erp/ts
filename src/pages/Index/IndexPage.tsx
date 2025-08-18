import { FC } from 'react';
import { TrackerWorklog } from 'entities/tracker/ui/common/TrackerWorklog/TrackerWorklog';
import { TTrackerConfig } from 'entities/tracker/model/types';

export const IndexPage: FC<{ mainTracker: TTrackerConfig | undefined }> = ({ mainTracker }) => (
  <TrackerWorklog tracker={mainTracker} />
);
