export type TJiraAccessibleResource = {
  id: string;
  name: string;
  url: string;
};

export type TJiraRefreshedTokenRequest = {
  clientId: string;
  refreshToken: string;
};

export type TJiraRefreshedTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};
