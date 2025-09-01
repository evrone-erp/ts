import { TIssueStatusDescription } from 'entities/issue/common/model/types';

export type TJiraIssue = {
  id: string;
  key: string;
  fields: {
    summary: string;
    status: {
      id: string;
      name: string;
    };
  };
};

export type TJiraIssuesResponse = {
  total: number;
  maxResults: number;
  issues: TJiraIssue[];
};

export type TJiraIssueStatusDescriptionsResponse = {
  values: TIssueStatusDescription[];
};
