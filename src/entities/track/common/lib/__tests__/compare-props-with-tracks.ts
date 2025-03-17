import { mockTracks } from '__mocks__/track';
import { comparePropsWithTracks } from 'entities/track/common/lib/compare-props-with-tracks';

it.each([
  {
    prev: { tracks: mockTracks, a: 1 },
    next: { tracks: mockTracks, a: 2 },
    expected: false,
    name: 'other props changed',
  },

  {
    prev: { tracks: mockTracks, a: 1 },
    next: { tracks: mockTracks, a: 1, b: () => {} },
    expected: false,
    name: 'new prop is provided',
  },

  {
    prev: { tracks: mockTracks, a: [] },
    next: { tracks: mockTracks, a: [] },
    expected: false,
    name: 'other prop is a new object',
  },

  {
    prev: { tracks: mockTracks, a: 1, b: 2 },
    next: { tracks: [mockTracks[0], mockTracks[1]], a: 1, b: 2 },
    expected: false,
    name: 'tracks are different lengths',
  },

  {
    prev: { tracks: [mockTracks[2], mockTracks[4]], a: 1, b: 2 },
    next: { tracks: [mockTracks[2], mockTracks[1]], a: 1, b: 2 },
    expected: false,
    name: 'tracks are different',
  },

  {
    prev: { tracks: mockTracks, a: 1 },
    next: { tracks: mockTracks, a: 1 },
    expected: true,
    name: 'props are same',
  },

  {
    prev: { tracks: [...mockTracks], a: 1 },
    next: { tracks: [...mockTracks], a: 1 },
    expected: true,
    name: 'tracks are different objects, but contain same tracks',
  },
])('should return $expected when $name', ({ prev, next, expected }) => {
  const result = comparePropsWithTracks(prev, next);

  expect(result).toBe(expected);
});
