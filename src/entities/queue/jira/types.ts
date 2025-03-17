import { TQueue } from 'entities/queue/common/model/types';

export type TJiraProjectsResponse = {
  total: number;
  maxResults: number;
  values: TQueue[];
};
