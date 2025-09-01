import dayjs from 'dayjs';
import { formatDateAsTrackKey, getTrackDateCacheKey } from 'entities/track/common/lib/helpers';

const setUtcHoursOffset = (hours: number) => {
  // eslint-disable-next-line
  (dayjs as any).__SET_TEST_UTC_OFFSET_HOURS__(hours);
};

afterAll(() => {
  // eslint-disable-next-line
  (dayjs as any).__RESET_DEFAULT_TEST_UTC_OFFSET_HOURS__();
});
describe('formatDateAsTrackKey', () => {
  it.each([
    ['2023-05-02T10:00:40+0000', 3, '2023-05-02T00:00:00+03:00'],
    ['2023-04-24T21:20:02+0000', 2, '2023-04-24T00:00:00+02:00'],
    ['2023-03-31T13:00:00+0000', 12, '2023-04-01T00:00:00+12:00'],
    ['2023-05-02T10:30:40+0000', -5, '2023-05-02T00:00:00-05:00'],
    ['2023-12-01T02:30:30+02:00', -6, '2023-11-30T00:00:00-06:00'],
    ['2023-09-12T20:00:00+01:00', 5, '2023-09-13T00:00:00+05:00'],
    ['2023-04-01T23:20:21+0000', 4, '2023-04-02T00:00:00+04:00'],
  ])('for %s with UTC offset %s returns %s', (dateStr, utcOffset, expected) => {
    setUtcHoursOffset(utcOffset);
    const date = dayjs(dateStr);

    const result = formatDateAsTrackKey(date);

    expect(result).toBe(expected);
  });
});

describe('getTrackDateCashKey', () => {
  it.each([
    ['2023-05-02T10:00:40+0000', 3, '2023-05-02T00:00:00+03:00'],
    ['2023-04-24T21:20:02+0000', 2, '2023-04-24T00:00:00+02:00'],
    ['2023-03-31T13:00:00+0000', 12, '2023-04-01T00:00:00+12:00'],
    ['2023-05-02T10:30:40+0000', -5, '2023-05-02T00:00:00-05:00'],
    ['2023-12-01T02:30:30+02:00', -6, '2023-11-30T00:00:00-06:00'],
    ['2023-09-12T20:00:00+01:00', 5, '2023-09-13T00:00:00+05:00'],
    ['2023-04-01T23:20:21+0000', 4, '2023-04-02T00:00:00+04:00'],
  ])('for %s with UTC offset %s returns %s', (dateStr, utcOffset, expected) => {
    setUtcHoursOffset(utcOffset);
    const result = getTrackDateCacheKey({ start: dateStr }, undefined);

    expect(result).toBe(expected);
  });
});
