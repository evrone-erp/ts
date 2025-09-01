import { TTrackerConfig } from 'entities/tracker/model/types';

export type TGetUserParams = {
  userId: string;
  tracker: TTrackerConfig;
};

export type TGetMyselfParams = {
  tracker: TTrackerConfig;
};

export type TGetUsersParams = {
  tracker: TTrackerConfig;
};
