export enum Tracker {
  Yandex = 'yandex',
  Jira = 'jira',
}

type TTrackerConfigCommon = {
  id: string;
  url: string;
  name: string;
  username: string;
  authToken?: string;
  lastLogin?: string;
};

export type TJiraTrackerConfig = TTrackerConfigCommon & {
  token: string;
  type: Tracker.Jira;
};

export type TYandexTrackerConfig = TTrackerConfigCommon & {
  orgId: string;
  isCloud: boolean;
  type: Tracker.Yandex;
};

export type TTrackerConfig = TJiraTrackerConfig | TYandexTrackerConfig;

export const isJiraTrackerCfg = (x: TTrackerConfig | undefined): x is TJiraTrackerConfig =>
  !!x && x.type === Tracker.Jira;

export const isYandexTrackerCfg = (x: TTrackerConfig | undefined): x is TYandexTrackerConfig =>
  !!x && x.type === Tracker.Yandex;

export const isTrackerType = (x: unknown): x is Tracker => x === Tracker.Jira || x === Tracker.Yandex;

export type TTrackerStore = {
  trackers: Record<string, TTrackerConfig>;
  ids: string[];
  mainTrackerId: string | null;
};

export type TSetMainTrackerPayload = {
  id: string;
};

export type TUpsertTrackerPayload = {
  nextTracker: TTrackerConfig;
  prevTracker?: TTrackerConfig;
};

export type TSetUsernamePayload = {
  id: string;
  username: string;
};

export type TSetAuthTokenPayload = {
  token: string;
  id: string | undefined;
  lastLogin: string;
};
