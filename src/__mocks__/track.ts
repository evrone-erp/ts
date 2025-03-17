import { TTrack } from 'entities/track/common/model/types';

export const mockTrack: TTrack = {
  comment: 'foo bar',
  duration: 'P2W',
  id: 0,
  issueKey: 'mock-issue-1',
  start: '2022-11-15T09:31:32.000+0000',
};

export const mockTracks: TTrack[] = [
  mockTrack,
  {
    ...mockTrack,
    id: 1,
    start: '2022-01-31T23:20:30.000+0000',
    issueKey: 'mock-issue-1',
  },
  {
    ...mockTrack,
    id: 2,
    start: '2023-05-02T10:00:40.000+0000',
    issueKey: 'mock-issue-2',
  },
  {
    ...mockTrack,
    id: 3,
    start: '2020-08-25T01:10:20.000+0000',
    issueKey: 'mock-issue-3',
  },
  {
    ...mockTrack,
    id: 4,
    start: '2023-05-02T14:10:20.000+0000',
    issueKey: 'mock-issue-3',
  },
  {
    ...mockTrack,
    id: 5,
    start: '2020-08-24T14:50:26.000+0000',
    issueKey: 'mock-issue-4',
  },
];
