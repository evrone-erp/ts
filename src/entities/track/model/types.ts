import { TEntityShort, TEntityShortKey } from 'shared/lib/types';

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

export type TGetTracksParams = {
  from: string;
  to: string;
  createdBy: number | undefined;
  utcOffsetInMinutes: number | undefined;
  // filters tracks by issue key
  issueKey?: string;
};

export type TCreateTrackParams = {
  issueKey: string;
  duration: string;
  start: string;
  comment?: string;
};

export type TTrackInputCreate = Partial<Pick<TCreateTrackParams, 'issueKey'>> & Pick<TCreateTrackParams, 'start'>;

export type TTrackInputDelete = {
  issueIdOrKey: string;
  trackId: number;
};

export type TTrackInputEdit = {
  form: Partial<TTrackInputEditForm>;
  param: TTrackInputEditParam;
};

export type TTrackInputEditForm = {
  comment: string;
  duration: TISODuration;
  start: string;
};

export type TTrackInputEditParam = {
  issueIdOrKey: string;
  trackId: number;
};

export type TBusinessDurationData = {
  hours: number;
  minutes: number;
  seconds: number;
};
