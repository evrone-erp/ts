import { trackListToMaps } from 'entities/track/common/model/track-list-to-maps';
import { mockTracks } from '__mocks__/track';
import dayjs from 'dayjs';
import { TTrack, TTransformedTracks } from 'entities/track/common/model/types';

const setUtcHoursOffset = (hours: number) => {
  // eslint-disable-next-line
  (dayjs as any).__SET_TEST_UTC_OFFSET_HOURS__(hours);
};

afterAll(() => {
  // eslint-disable-next-line
  (dayjs as any).__RESET_DEFAULT_TEST_UTC_OFFSET_HOURS__();
});

const expectedDefaultEmpty: TTransformedTracks = {
  list: [],
  issueKeyList: [],
  date2Tracks: {},
  issueKey2Tracks: {},
};

const defaultArg = {
  from: '2020-01-01T00:00:00.000+0000',
  to: '2024-12-31T23:59:59.000+0000',
  createdBy: undefined,
  utcOffsetInMinutes: undefined,
};

it.each([[undefined], [[] as TTrack[]]] as const)('should return default structure when "tracks" is %j', (tracks) => {
  const result = trackListToMaps(defaultArg, tracks);

  expect(result).toEqual(expectedDefaultEmpty);
});

it('should return list of issue keys', () => {
  const res = trackListToMaps(defaultArg, mockTracks);
  expect(res.issueKeyList).toEqual(['mock-issue-1', 'mock-issue-2', 'mock-issue-3', 'mock-issue-4']);
});

it('should filter tracks by issue key', () => {
  const res = trackListToMaps({ ...defaultArg, issueKey: 'mock-issue-3' }, mockTracks);

  expect(res.date2Tracks).toEqual({
    '2023-05-02T00:00:00+03:00': [mockTracks[4]],
    '2020-08-25T00:00:00+03:00': [mockTracks[3]],
  });
  expect(res.issueKeyList).toEqual(['mock-issue-3']);
  expect(res.list).toEqual([mockTracks[3], mockTracks[4]]);
});

it('should transform tracks according to utcOffsetInMinutes argument', () => {
  const res = trackListToMaps({ ...defaultArg, utcOffsetInMinutes: -300 }, mockTracks);

  expect(res.date2Tracks).toEqual({
    '2022-11-15T00:00:00-05:00': [mockTracks[0]],
    '2022-01-31T00:00:00-05:00': [mockTracks[1]],
    '2023-05-02T00:00:00-05:00': [mockTracks[2], mockTracks[4]],
    '2020-08-24T00:00:00-05:00': [mockTracks[3], mockTracks[5]],
  });
});

it('should filter tracks by date', () => {
  const res = trackListToMaps(
    { ...defaultArg, from: '2020-08-23T00:00:00.000+0000', to: '2020-08-26T00:00:00.000+0000' },
    mockTracks,
  );

  expect(res.date2Tracks).toEqual({
    '2020-08-25T00:00:00+03:00': [mockTracks[3]],
    '2020-08-24T00:00:00+03:00': [mockTracks[5]],
  });
  expect(res.issueKeyList).toEqual(['mock-issue-3', 'mock-issue-4']);
  expect(res.list).toEqual([mockTracks[3], mockTracks[5]]);
});

describe('edge cases for local time zones', () => {
  describe('should assign tracks to dates, according to UTC offset', () => {
    it('0 hours', () => {
      setUtcHoursOffset(0);
      const res = trackListToMaps(defaultArg, mockTracks);

      expect(res.date2Tracks).toEqual({
        '2022-11-15T00:00:00Z': [mockTracks[0]],
        '2022-01-31T00:00:00Z': [mockTracks[1]],
        '2023-05-02T00:00:00Z': [mockTracks[2], mockTracks[4]],
        '2020-08-25T00:00:00Z': [mockTracks[3]],
        '2020-08-24T00:00:00Z': [mockTracks[5]],
      });
    });

    it('+3 hours', () => {
      setUtcHoursOffset(3);

      const res = trackListToMaps(defaultArg, mockTracks);

      expect(res.date2Tracks).toEqual({
        '2022-11-15T00:00:00+03:00': [mockTracks[0]],
        '2022-02-01T00:00:00+03:00': [mockTracks[1]],
        '2023-05-02T00:00:00+03:00': [mockTracks[2], mockTracks[4]],
        '2020-08-25T00:00:00+03:00': [mockTracks[3]],
        '2020-08-24T00:00:00+03:00': [mockTracks[5]],
      });
    });

    it('-5 hours', () => {
      setUtcHoursOffset(-5);

      const res = trackListToMaps(defaultArg, mockTracks);

      expect(res.date2Tracks).toEqual({
        '2022-11-15T00:00:00-05:00': [mockTracks[0]],
        '2022-01-31T00:00:00-05:00': [mockTracks[1]],
        '2023-05-02T00:00:00-05:00': [mockTracks[2], mockTracks[4]],
        '2020-08-24T00:00:00-05:00': [mockTracks[3], mockTracks[5]],
      });
    });

    it('-9 hours', () => {
      setUtcHoursOffset(-9);

      const res = trackListToMaps(defaultArg, mockTracks);

      expect(res.date2Tracks).toEqual({
        '2022-11-15T00:00:00-09:00': [mockTracks[0]],
        '2022-01-31T00:00:00-09:00': [mockTracks[1]],
        '2023-05-02T00:00:00-09:00': [mockTracks[2], mockTracks[4]],
        '2020-08-24T00:00:00-09:00': [mockTracks[3], mockTracks[5]],
      });
    });

    it('+9 hours', () => {
      setUtcHoursOffset(9);

      const res = trackListToMaps(defaultArg, mockTracks);

      expect(res.date2Tracks).toEqual({
        '2022-11-15T00:00:00+09:00': [mockTracks[0]],
        '2022-02-01T00:00:00+09:00': [mockTracks[1]],
        '2023-05-02T00:00:00+09:00': [mockTracks[2], mockTracks[4]],
        '2020-08-25T00:00:00+09:00': [mockTracks[3]],
        '2020-08-24T00:00:00+09:00': [mockTracks[5]],
      });
    });

    it('-12 hours', () => {
      setUtcHoursOffset(-12);

      const res = trackListToMaps(defaultArg, mockTracks);

      expect(res.date2Tracks).toEqual({
        '2022-11-14T00:00:00-12:00': [mockTracks[0]],
        '2022-01-31T00:00:00-12:00': [mockTracks[1]],
        '2023-05-01T00:00:00-12:00': [mockTracks[2]],
        '2020-08-24T00:00:00-12:00': [mockTracks[3], mockTracks[5]],
        '2023-05-02T00:00:00-12:00': [mockTracks[4]],
      });
    });

    it('+12 hours', () => {
      setUtcHoursOffset(12);

      const res = trackListToMaps(defaultArg, mockTracks);

      expect(res.date2Tracks).toEqual({
        '2022-11-15T00:00:00+12:00': [mockTracks[0]],
        '2022-02-01T00:00:00+12:00': [mockTracks[1]],
        '2023-05-02T00:00:00+12:00': [mockTracks[2]],
        '2020-08-25T00:00:00+12:00': [mockTracks[3], mockTracks[5]],
        '2023-05-03T00:00:00+12:00': [mockTracks[4]],
      });
    });
  });

  describe('should assign tracks to issue keys, according to UTC offset', () => {
    it('-10 hours', () => {
      setUtcHoursOffset(-10);
      const res = trackListToMaps(defaultArg, mockTracks);
      expect(res.issueKey2Tracks).toEqual({
        'mock-issue-1': {
          date2Tracks: {
            '2022-01-31T00:00:00-10:00': [mockTracks[1]],
            '2022-11-14T00:00:00-10:00': [mockTracks[0]],
          },
          list: [mockTracks[0], mockTracks[1]],
        },
        'mock-issue-2': {
          date2Tracks: {
            '2023-05-02T00:00:00-10:00': [mockTracks[2]],
          },
          list: [mockTracks[2]],
        },
        'mock-issue-3': {
          date2Tracks: {
            '2020-08-24T00:00:00-10:00': [mockTracks[3]],
            '2023-05-02T00:00:00-10:00': [mockTracks[4]],
          },
          list: [mockTracks[3], mockTracks[4]],
        },
        'mock-issue-4': {
          date2Tracks: {
            '2020-08-24T00:00:00-10:00': [mockTracks[5]],
          },
          list: [mockTracks[5]],
        },
      });
    });

    it('+8 hours', () => {
      setUtcHoursOffset(8);
      const res = trackListToMaps(defaultArg, mockTracks);
      expect(res.issueKey2Tracks).toEqual({
        'mock-issue-1': {
          date2Tracks: {
            '2022-02-01T00:00:00+08:00': [mockTracks[1]],
            '2022-11-15T00:00:00+08:00': [mockTracks[0]],
          },
          list: [mockTracks[0], mockTracks[1]],
        },
        'mock-issue-2': {
          date2Tracks: {
            '2023-05-02T00:00:00+08:00': [mockTracks[2]],
          },
          list: [mockTracks[2]],
        },
        'mock-issue-3': {
          date2Tracks: {
            '2020-08-25T00:00:00+08:00': [mockTracks[3]],
            '2023-05-02T00:00:00+08:00': [mockTracks[4]],
          },
          list: [mockTracks[3], mockTracks[4]],
        },
        'mock-issue-4': {
          date2Tracks: {
            '2020-08-24T00:00:00+08:00': [mockTracks[5]],
          },
          list: [mockTracks[5]],
        },
      });
    });
  });
});
