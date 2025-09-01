import { TEntityShort, TEntityShortKey } from 'shared/lib/types';
import { TISODuration, TTrackInputEditParam } from 'entities/track/common/model/types';
import { TTrackerConfig } from 'entities/tracker/model/types';

export type TYandexTrack = {
  self: string;
  id: number;
  version: number;
  issue: TEntityShortKey;
  comment: string;
  createdBy: TEntityShort;
  updatedBy: TEntityShort;
  createdAt: string;
  updatedAt: string;
  start: string;
  duration: TISODuration;
};

export type TYandexGetTracksParams = {
  from: string;
  to: string;
  createdBy: number | undefined;
  utcOffsetInMinutes: number | undefined;
  tracker: TTrackerConfig;
  // filters tracks by issue key
  issueKey?: string;
};

export type TYandexCreateTrackParams = {
  tracker: TTrackerConfig;
  issueKey: string;
  duration: string;
  start: string;
  comment?: string;
};

export type TYandexEditTrackParams = {
  tracker: TTrackerConfig;
  form: {
    comment?: string;
    start?: string;
    duration?: TISODuration;
  };
  param: TTrackInputEditParam;
};
