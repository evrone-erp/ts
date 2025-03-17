import { TTrackerConfig } from 'entities/tracker/model/types';

export type TQueue = {
  id: number | string;
  key: string;
};

export type TGetQueuesParams = {
  tracker: TTrackerConfig;
};
