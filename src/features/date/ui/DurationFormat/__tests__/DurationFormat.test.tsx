import { render } from '@testing-library/react';
import { DurationFormat } from 'features/date/ui/DurationFormat/DurationFormat';

jest.mock('entities/locale/lib/hooks');

it.each([
  [{ hours: 20, minutes: 10, seconds: 5 }, '20ч 10м 5с'],
  [{ hours: 15, minutes: 60, seconds: 5 }, '15ч 60м 5с'],
  [{ hours: 225, minutes: 90, seconds: 80 }, '225ч 90м 80с'],
  [{ hours: 3, minutes: 0, seconds: 0 }, '3ч'],
  [{ hours: 3, minutes: 24, seconds: 0 }, '3ч 24м'],
  [{ hours: 0, minutes: 6, seconds: 0 }, '6м'],
  [{ hours: 0, minutes: 6, seconds: 521 }, '6м 521с'],
  [{ hours: 0, minutes: 0, seconds: 5 }, '5с'],
  [{ hours: 55, minutes: 0, seconds: 5 }, '55ч 5с'],
])('for "%s" should render "%s', async (duration, result) => {
  const { findByText } = render(<DurationFormat duration={duration} />);

  expect(await findByText(result)).toBeInTheDocument();
});
