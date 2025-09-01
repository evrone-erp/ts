export enum JiraAccountType {
  Atlassian = 'atlassian',
  App = 'app',
}

export type TJiraUser = {
  accountId: string;
  emailAddress: string;
  active: boolean;
  accountType: JiraAccountType;
  displayName: string;
};
