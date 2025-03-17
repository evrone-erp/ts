import { fireEvent, render } from '@testing-library/react';
import { TrackFormCreate } from 'entities/track/ui/TrackFormCreate/TrackFormCreate';

jest.mock('entities/locale/lib/hooks');
jest.mock('entities/locale/ui/Message');

jest.mock('entities/issue/ui/IssuesSearch', () => ({
  IssuesSearch: () => 'mock',
}));

jest.mock('entities/track/ui/IssueTracks', () => ({
  IssueTracks: () => 'mock',
}));

jest.mock('entities/track/model/use-create-track', () => ({
  useCreateTrack: () => ({ isLoading: false, onTrackFormCreateSubmit: () => {} }),
}));

const initialValues = { issueKey: 'foo', start: '2023-01-01T00:00:00.000+0000' };

it('should render with disabled button if initial values do not pass validation', async () => {
  const { findByText } = render(<TrackFormCreate initialValues={initialValues} />);

  expect(await findByText('Создать')).toHaveAttribute('disabled');
});

it.each([
  ['10', true],
  ['10недель 5ч 30с', true],
  ['10ч', true],
  ['  6ч   ', true],
  ['3часа 20сек', true],
  [' 60 ', true],
  ['12 23', false],
  ['фац', false],
  ['', false],
  ['gawgawg', false],
  ['2ча', false],
  ['3часа 20сек 10мин', false],
])(
  'should disable or enable "Create" button accordingly in case "%s" is typed in duration field',
  async (str, shouldBeEnabled) => {
    const { findByText, findByLabelText } = render(<TrackFormCreate initialValues={initialValues} />);

    const durationField = await findByLabelText('duration');

    fireEvent.change(durationField, { target: { value: str } });

    if (shouldBeEnabled) {
      expect(await findByText('Создать')).not.toHaveAttribute('disabled');
    } else {
      expect(await findByText('Создать')).toHaveAttribute('disabled');
    }
  },
);
