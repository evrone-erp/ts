import { TEntityShort, TEntityShortKey, TSortOrder } from 'shared/lib/types';
import { TLocale } from 'entities/locale/model/types';

type TIssueStatusKey =
  | 'closed'
  | 'inProgress'
  | 'inReview'
  | 'merged'
  | 'open'
  | 'plan'
  | 'rc'
  | 'readyForTest'
  | 'resolved';

export type TIssueStatus = {
  id: string;
  display: string;
  key: TIssueStatusKey;
};

export type TIssue = {
  affectedVersions: TEntityShort[];
  assignee: TEntityShort;
  commentWithExternalMessageCount: number;
  commentWithoutExternalMessageCount: number;
  createdAt: string;
  createdBy: TEntityShort;
  description: string;
  estimation: string;
  favorite: boolean;
  fixVersions: TEntityShort[];
  id: string;
  key: string;
  originalEstimation: string;
  previousStatus: TEntityShortKey;
  previousStatusLastAssignee: TEntityShort;
  priority: TEntityShortKey;
  queue: TEntityShortKey;
  self: string;
  spent: string;
  status: TIssueStatus;
  statusStartTime: string;
  summary: string;
  type: TEntityShortKey;
  updatedAt: string;
  updatedBy: TEntityShort;
  version: number;
  votes: number;
};

export type TGetIssueParams = {
  issueIdOrKey: string;
};

type TIssuesCommonParams = {
  language?: TLocale | null;
  utcOffsetInMinutes: number | undefined;
};

export type TGetUserIssuesParams = TIssuesCommonParams & {
  from: string;
  to: string;
  userName: string;
  includeIssues?: string[];
  statusList?: string[];
  sortBy?: string;
  sortOder?: TSortOrder;
  summary?: string;
  queue?: string[];
};

export type TSearchIssuesParams = TIssuesCommonParams & {
  search: string | undefined;
};

export type TGetIssuesParams = TGetUserIssuesParams | TSearchIssuesParams;

export type TIssueKey = 'Summary' | 'Created' | 'Updated' | 'Key' | 'Assignee' | 'Status' | 'Queue';

export type TStatus = {
  id: number;
  name: string;
};
