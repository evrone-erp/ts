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
};

export type TJiraTrackerConfig = TTrackerConfigCommon & {
  type: Tracker.Jira;
  tokenExpiryTimestamp?: number;
  refreshToken?: string;
  refreshTokenExpiryTimestamp?: number;
  cloudId?: string;
};

export type TYandexTrackerConfig = TTrackerConfigCommon & {
  lastLogin?: string;
  orgId: string;
  isCloud: boolean;
  type: Tracker.Yandex;
};

export type TTrackerConfig = TJiraTrackerConfig | TYandexTrackerConfig;

export const isJiraTrackerCfg = (x: TTrackerConfig | undefined): x is TJiraTrackerConfig =>
  !!x && x.type === Tracker.Jira;

export const isYandexTrackerCfg = (x: TTrackerConfig | undefined): x is TYandexTrackerConfig =>
  !!x && x.type === Tracker.Yandex;

export type TTrackerStore = {
  trackers: Record<string, TTrackerConfig>;
  ids: string[];
  mainTrackerId: string | null;
  // jira OAuth requires a generated "state" string, associated with the user account.
  // this is a map username -> state
  // https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#1--direct-the-user-to-the-authorization-url-to-get-an-authorization-code
  userName2State: Record<string, string>;
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

export type TSetYandexAuthTokenPayload = {
  token: string;
  id: string | undefined;
  lastLogin: string;
};

export type TSetJiraTokenAndCloudIdByUrlsPayload = {
  token: string;
  refreshToken: string;
  tokenExpiryTimestamp: number;
  refreshTokenExpiryTimestamp: number;
  urls: string[];
  url2CloudId: Record<string, string>;
};

export type TSetUsernameState = {
  username: string;
  jiraState: string;
};

export type TSetJiraTrackerTokens = {
  trackerId: string;
  token: string;
  refreshToken: string;
  tokenExpiryTimestamp: number;
};
