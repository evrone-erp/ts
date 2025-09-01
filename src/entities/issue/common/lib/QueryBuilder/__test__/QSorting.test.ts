import { YandexQSorting } from 'entities/issue/yandex/lib/QueryBuilder/YandexQSorting';

describe('should return empty string', () => {
  it('if no order is provided', () => {
    const res = new YandexQSorting('Key', undefined).buildQuery();

    expect(res).toBe('');
  });

  it('if no name is provided', () => {
    const res = new YandexQSorting(undefined, 'ASC').buildQuery();

    expect(res).toBe('');
  });
});

it('should return query string', () => {
  const res = new YandexQSorting('Key', 'ASC').buildQuery();

  expect(res).toBe(`"Sort by": Key ASC`);
});
