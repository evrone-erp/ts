import { TJiraTrackerConfig, TTrackerConfig } from 'entities/tracker/model/types';
import { TTrackInputEditParam } from 'entities/track/common/model/types';

export type TJiraGetTracksParams = {
  from: string;
  to: string;
  fromTimestamp: number;
  toTimestamp: number;
  issueKeyList: string[];
  userId: string;
  tracker: TJiraTrackerConfig;

  utcOffsetInMinutes: number | undefined;
};

export type TJiraTracksResponse = {
  total: number;
  maxResults: number;
  worklogs: TJiraTrack[];
};

export type TJiraTrack = {
  id: string;
  issueId: string;
  started: string;
  timeSpentSeconds: number;
  author: {
    accountId: string;
    emailAddress: string;
  };
};

export type TJiraCreateTrackParams = {
  tracker: TTrackerConfig;
  issueKey: string;
  timeSpentSeconds: number;
  start: string;
  comment?: object;
};

export type TJiraEditTrackParams = {
  tracker: TTrackerConfig;
  form: {
    comment?: string;
    start?: string;
    timeSpentSeconds?: number;
  };
  param: TTrackInputEditParam;
};
