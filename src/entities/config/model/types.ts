export type TConfigStore = {
  auth: TConfigAuth;
  options: TConfigOptions;
  trackerUrl: string;
};

export type TConfigAuth = {
  params: TConfigAuthParams;
  url: string;
};

export type TConfigAuthParams = {
  client_id: string;
  response_type: string;
};

export type TConfigOptions = RequestInit;
