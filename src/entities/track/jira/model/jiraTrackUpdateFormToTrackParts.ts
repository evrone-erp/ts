import { TJiraEditTrackParams } from 'entities/track/jira/model/types';
import { TTrack } from 'entities/track/common/model/types';
import { filterObjectFields } from 'shared/lib/filterObjectFields';
import { msToBusinessDurationData } from 'entities/track/common/lib/ms-to-business-duration-data';
import { businessDurationDataToIso } from 'entities/track/common/lib/business-duration-data-to-iso';

/**
 * takes fields of track creation form and transforms it into corresponding TTrack fields
 */
export const jiraTrackUpdateFormToTrackParts = ({
  comment,
  start,
  timeSpentSeconds,
}: TJiraEditTrackParams['form']): Partial<TTrack> =>
  filterObjectFields({
    comment,
    start,
    duration: timeSpentSeconds
      ? businessDurationDataToIso(msToBusinessDurationData(timeSpentSeconds * 1000))
      : undefined,
  });
