import { Tracker, TTrackerConfig } from 'entities/tracker/model/types';

export const mockTracker: TTrackerConfig = {
  type: Tracker.Yandex,
  url: 'https://tracker.yandex.ru/',
  orgId: 'foobar',
  isCloud: true,
  name: 'Mock tracker',
  id: 'mock_tracker',
  username: 'john_doe@mail.com',
};
