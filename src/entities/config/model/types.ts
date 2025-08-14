export type TConfigStore = {
  auth: TConfigAuth<TConfigYandexAuthParams>;
  jiraAuth: TConfigAuth<TConfigJiraAuthParams>;
  options: TConfigOptions;
  trackerUrl: string;
};

export type TConfigAuth<TParams> = {
  params: TParams;
  url: string;
};

export type TConfigYandexAuthParams = {
  client_id: string;
  response_type: string;
};

export type TConfigJiraAuthParams = {
  audience: string;
  client_id: string;
  scope: string[];
  state: string;
  response_type: string;
  prompt: string;
};

export type TConfigOptions = RequestInit;
