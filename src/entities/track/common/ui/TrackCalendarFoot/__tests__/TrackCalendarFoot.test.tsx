import dayjs from 'dayjs';
import { TrackCalendarFoot } from 'entities/track/common/ui/TrackCalendarFoot/TrackCalendarFoot';
import { render } from '@testing-library/react';
import { mockTrack } from '__mocks__/track';
import { formatDateAsTrackKey } from 'entities/track/common/lib/helpers';

jest.mock('entities/locale/ui/Message');
jest.mock('entities/locale/lib/hooks');

const date1 = formatDateAsTrackKey(dayjs().subtract(1, 'day'));
const date2 = formatDateAsTrackKey(dayjs());

const dateTracks1 = [
  { ...mockTrack, duration: 'PT10H30M20S' as const },
  { ...mockTrack, duration: 'P1W10DT8H70M10S' as const },
];
const dateTracks2 = [
  { ...mockTrack, duration: 'PT6H' as const },
  { ...mockTrack, duration: 'PT3H' as const },
  { ...mockTrack, duration: 'PT10H30M10S' as const },
];

const date2Tracks = {
  [date1]: dateTracks1,
  [date2]: dateTracks2,
};
const trackList = [...dateTracks1, ...dateTracks2];

describe('total issues', () => {
  it('should be displayed', async () => {
    const { findByLabelText } = render(
      <TrackCalendarFoot
        range={[date1, date2]}
        utcOffsetInMinutes={undefined}
        totalIssues={5}
        date2Tracks={date2Tracks}
        trackList={trackList}
      />,
    );

    const totalElement = await findByLabelText('total issues');
    expect(totalElement.textContent).toContain('Всего задач: 5');
  });
});

describe('day worklog sum', () => {
  it('renders total sum for two days in two elements', async () => {
    const { findAllByLabelText } = render(
      <TrackCalendarFoot
        range={[date1, date2]}
        utcOffsetInMinutes={undefined}
        totalIssues={5}
        date2Tracks={date2Tracks}
        trackList={trackList}
      />,
    );

    const [sumOneElement, sumTwoElement] = await findAllByLabelText('total day sum');
    expect(sumOneElement.textContent).toEqual('139ч 40м 30с');
    expect(sumTwoElement.textContent).toEqual('19ч 30м 10с');
  });
});

describe('total worklog sum', () => {
  it('renders total for two days', async () => {
    const { findByLabelText } = render(
      <TrackCalendarFoot
        range={[date1, date2]}
        utcOffsetInMinutes={undefined}
        totalIssues={5}
        date2Tracks={date2Tracks}
        trackList={trackList}
      />,
    );

    const element = await findByLabelText('total sum');
    expect(element.textContent).toEqual('159ч 10м 40с');
  });
});
