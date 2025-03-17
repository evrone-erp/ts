import { QSorting } from 'entities/issue/lib/QueryBuilder/QSorting';

describe('should return empty string', () => {
  it('if no order is provided', () => {
    const res = new QSorting('Key', undefined).buildQuery();

    expect(res).toBe('');
  });

  it('if no name is provided', () => {
    const res = new QSorting(undefined, 'ASC').buildQuery();

    expect(res).toBe('');
  });
});

it('should return query string', () => {
  const res = new QSorting('Key', 'ASC').buildQuery();

  expect(res).toBe(`"Sort by": Key ASC`);
});
