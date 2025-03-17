import { TTrack } from 'entities/track/model/types';

export const mockTrack: TTrack = {
  comment: 'foo bar',
  createdAt: '',
  createdBy: {
    display: 'creator',
    id: 'creator_id',
    self: 'creator_self',
  },
  duration: 'P2W',
  id: 0,
  issue: {
    key: 'mock-issue-1',
    display: 'issue',
    id: 'issue_id',
    self: 'issue_self',
  },
  self: 'self',
  start: '2022-11-15T09:31:32.000+0000',
  updatedAt: '',
  updatedBy: {
    display: 'updatedBy',
    id: 'updatedBy_id',
    self: 'updatedBy_self',
  },
  version: 0,
};

export const mockTracks: TTrack[] = [
  mockTrack,
  {
    ...mockTrack,
    id: 1,
    start: '2022-01-31T23:20:30.000+0000',
    issue: {
      ...mockTrack.issue,
      key: 'mock-issue-1',
    },
  },
  {
    ...mockTrack,
    id: 2,
    start: '2023-05-02T10:00:40.000+0000',
    issue: {
      ...mockTrack.issue,
      key: 'mock-issue-2',
    },
  },
  {
    ...mockTrack,
    id: 3,
    start: '2020-08-25T01:10:20.000+0000',
    issue: {
      ...mockTrack.issue,
      key: 'mock-issue-3',
    },
  },
  {
    ...mockTrack,
    id: 4,
    start: '2023-05-02T14:10:20.000+0000',
    issue: {
      ...mockTrack.issue,
      key: 'mock-issue-3',
    },
  },
  {
    ...mockTrack,
    id: 5,
    start: '2020-08-24T14:50:26.000+0000',
    issue: {
      ...mockTrack.issue,
      key: 'mock-issue-4',
    },
  },
];
