import { TTrackerConfig } from 'entities/tracker/model/types';

type TWeek = `${number}W` | '';
type TDay = `${number}D` | '';
type THour = `${number}H` | '';
type TMinute = `${number}M` | '';
type TSecond = `${number}S` | '';

type TNominal = `${TWeek}${TDay}`;
type TAccurate = `T${THour}${TMinute}${TSecond}` | '';

// this type describes time duration string with designators, according to ISO-8601 paragraph 4.4.3.2
export type TISODuration = `P${TNominal}${TAccurate}`;

export type TTrackStore = {
  inputCreate?: TTrackInputCreate;
  inputDelete?: TTrackInputDelete;
};

export type TTrack = {
  id: number | string;
  issueKey: string;
  comment: string;
  start: string;
  duration: TISODuration;
  authorId?: string;
};

export type TTransformedTracksByDateRange = {
  list: TTrack[];
  /**
   * We store tracks in maps, according to the date, when they start.
   * ISO string of local start of day -> tracks
   *   @example
   *   const track = {
   *     start: "2023-12-19T22:00:00.000+0000"
   *   }
   *
   *   for client in time zone +5 it will be stored as
   *   {
   *     "2023-12-20T00:00:00+05:00": [track]
   *   }
   */
  date2Tracks: Record<string, TTrack[]>;
};

export type TTransformedTracks = TTransformedTracksByDateRange & {
  issueKeyList: string[];
  issueKey2Tracks: Record<string, TTransformedTracksByDateRange>;
};

export type TTrackInputCreate = {
  issueKey?: string;
  start: string;
};

export type TTrackInputDelete = {
  issueIdOrKey: string;
  trackId: number | string;
};

export type TDeleteTrackParams = TTrackInputDelete & {
  tracker: TTrackerConfig;
};

export type TTrackInputEditForm = {
  comment: string;
  duration: TISODuration;
  start: string;
};

export type TTrackInputEditParam = {
  issueIdOrKey: string;
  trackId: number | string;
};

export type TBusinessDurationData = {
  hours: number;
  minutes: number;
  seconds: number;
};
