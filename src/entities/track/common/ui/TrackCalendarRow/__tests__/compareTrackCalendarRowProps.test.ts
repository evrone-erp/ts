import dayjs from 'dayjs';
import { compareTrackCalendarRowProps } from 'entities/track/common/ui/TrackCalendarRow/compareTrackCalendarRowProps';
import { mockTracks } from '__mocks__/track';
import { formatDateAsTrackKey } from 'entities/track/common/lib/helpers';

const date1 = formatDateAsTrackKey(dayjs());
const date2 = formatDateAsTrackKey(dayjs().add(1, 'day'));
const date3 = formatDateAsTrackKey(dayjs().add(2, 'day'));

const date2IssueTracks = {
  [date1]: [mockTracks[0], mockTracks[1]],
  [date2]: [mockTracks[2]],
};

it.each([
  {
    prev: { date2IssueTracks, tracks: mockTracks, a: 1 },
    next: { date2IssueTracks, tracks: mockTracks, a: 2 },
    expected: false,
    name: 'other props changed',
  },

  {
    prev: { date2IssueTracks, tracks: mockTracks, a: 1 },
    next: { date2IssueTracks, tracks: mockTracks, a: 1, b: () => {} },
    expected: false,
    name: 'new prop is provided',
  },

  {
    prev: { date2IssueTracks, tracks: mockTracks, a: [] },
    next: { date2IssueTracks, tracks: mockTracks, a: [] },
    expected: false,
    name: 'other prop is a new object',
  },

  {
    prev: { date2IssueTracks, tracks: mockTracks, a: 1, b: 2 },
    next: { date2IssueTracks, tracks: [mockTracks[0], mockTracks[1]], a: 1, b: 2 },
    expected: false,
    name: 'tracks are different lengths',
  },

  {
    prev: { date2IssueTracks, tracks: [mockTracks[1], mockTracks[3]], a: 1, b: 2 },
    next: { date2IssueTracks, tracks: [mockTracks[1], mockTracks[4]], a: 1, b: 2 },
    expected: false,
    name: 'tracks are different',
  },

  {
    prev: { date2IssueTracks, tracks: mockTracks, a: 1 },
    next: {
      date2IssueTracks: {
        [date1]: [mockTracks[0], mockTracks[1]],
        [date3]: [mockTracks[2]],
      },
      tracks: mockTracks,
      a: 1,
    },
    expected: false,
    name: 'date2IssueTracks contains different dates',
  },

  {
    prev: { date2IssueTracks, tracks: mockTracks, a: 1 },
    next: {
      date2IssueTracks: {
        [date1]: [mockTracks[0], mockTracks[1]],
        [date2]: [mockTracks[3]],
      },
      tracks: mockTracks,
      a: 1,
    },
    expected: false,
    name: 'date2IssueTracks contains different tracks',
  },

  {
    prev: { date2IssueTracks, tracks: mockTracks, a: 1 },
    next: {
      date2IssueTracks: {
        [date1]: [mockTracks[0], mockTracks[1]],
        [date2]: [mockTracks[3]],
        [date3]: [mockTracks[3]],
      },
      tracks: mockTracks,
      a: 1,
    },
    expected: false,
    name: 'date2IssueTracks has different sizes',
  },

  {
    prev: { date2IssueTracks, tracks: mockTracks, a: 1 },
    next: { date2IssueTracks, tracks: mockTracks, a: 1 },
    expected: true,
    name: 'props are same',
  },

  {
    prev: { date2IssueTracks, tracks: [...mockTracks], a: 1 },
    next: { date2IssueTracks, tracks: [...mockTracks], a: 1 },
    expected: true,
    name: 'tracks are different objects, but contain same tracks',
  },

  {
    prev: { date2IssueTracks, tracks: mockTracks, a: 1 },
    next: {
      date2IssueTracks: {
        [date1]: [mockTracks[0], mockTracks[1]],
        [date2]: [mockTracks[2]],
      },
      tracks: mockTracks,
      a: 1,
    },
    expected: true,
    name: 'tracks and date2IssueTracks maps are different objects, but contain same tracks',
  },
])('should return $expected when $name', ({ prev, next, expected }) => {
  const result = compareTrackCalendarRowProps(prev, next);

  expect(result).toBe(expected);
});
