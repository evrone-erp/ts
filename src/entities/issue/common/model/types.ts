import { TTrackerConfig } from 'entities/tracker/model/types';
import { TLocale } from 'entities/locale/model/types';
import { TSortOrder } from 'shared/lib/types';

export type TIssueStatus = {
  id: string;
  display: string;
  key: string;
};

export type TIssue = {
  id: string;
  key: string;
  summary: string;
  status: TIssueStatus;
};

export type TIssueStatusDescription = {
  id: number;
  name: string;
};

export type TGetIssueParams = {
  issueIdOrKey: string;
  tracker: TTrackerConfig;
};

type TIssuesCommonParams = {
  language?: TLocale | null;
  utcOffsetInMinutes: number | undefined;
  tracker: TTrackerConfig;
};

export type TGetUserIssuesParams = TIssuesCommonParams & {
  from: string;
  to: string;
  // can be either username or id in both Jira and Yandex
  user: string | number;
  includeIssues?: string[];
  statusList?: string[];
  sortBy?: string;
  sortOrder?: TSortOrder;
  summary?: string;
  queue?: string[];
};

export type TSearchIssuesParams = TIssuesCommonParams & {
  search: string | undefined;
};

export type TGetIssuesParams = TGetUserIssuesParams | TSearchIssuesParams;

export type TGetIssuesStatusesQuery = {
  tracker: TTrackerConfig;
  language: TLocale;
};
