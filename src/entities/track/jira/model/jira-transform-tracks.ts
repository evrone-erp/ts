import { TTrack } from 'entities/track/common/model/types';
import { TJiraTrack } from 'entities/track/jira/model/types';
import { businessDurationDataToIso } from 'entities/track/common/lib/business-duration-data-to-iso';
import { msToBusinessDurationData } from 'entities/track/common/lib/ms-to-business-duration-data';

export const jiraTransformTrack = (
  { id, started, timeSpentSeconds, author }: TJiraTrack,
  issueKey: string,
): TTrack => ({
  id,
  issueKey,
  comment: '',
  start: started,
  duration: businessDurationDataToIso(msToBusinessDurationData(timeSpentSeconds * 1000)) ?? 'PT0H',
  authorId: author.accountId,
});

export const jiraTransformTracks = (tracks: TJiraTrack[], issueKey: string): TTrack[] =>
  tracks.map((track) => jiraTransformTrack(track, issueKey));
