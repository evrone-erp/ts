import type { TIssueStatusDescription } from 'entities/issue/common/model/types';

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
  issues: TJiraIssue[];
  isLast: boolean;
  nextPageToken?: string;
};

export type TJiraIssueStatusDescriptionsResponse = {
  values: TIssueStatusDescription[];
};
