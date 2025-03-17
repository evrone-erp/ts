import { TEntityShort, TEntityShortKey } from 'shared/lib/types';

type TYandexIssueStatusKey =
  | 'closed'
  | 'inProgress'
  | 'inReview'
  | 'merged'
  | 'open'
  | 'plan'
  | 'rc'
  | 'readyForTest'
  | 'resolved';

export type TYandexIssueStatus = {
  id: string;
  display: string;
  key: TYandexIssueStatusKey;
};

export type TYandexIssue = {
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
  status: TYandexIssueStatus;
  statusStartTime: string;
  summary: string;
  type: TEntityShortKey;
  updatedAt: string;
  updatedBy: TEntityShort;
  version: number;
  votes: number;
};
