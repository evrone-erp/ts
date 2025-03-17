import { QParam } from 'entities/issue/lib/QueryBuilder/QParam';

describe('should return empty string', () => {
  it('if no value is provided', () => {
    const res = new QParam('Summary', undefined, '!').buildQuery();

    expect(res).toBe('');
  });

  it('if provided value is empty array', () => {
    const res = new QParam('Summary', [], '<').buildQuery();

    expect(res).toBe('');
  });

  it('if provided value is empty string', () => {
    const res = new QParam('Summary', '', '>').buildQuery();

    expect(res).toBe('');
  });
});

it('should return query string', () => {
  const res = new QParam('Summary', 'value').buildQuery();

  expect(res).toBe(`"Summary": "value"`);
});

it('should return query string with operator', () => {
  const res = new QParam('Summary', 'value', '>=').buildQuery();

  expect(res).toBe(`"Summary": >="value"`);
});

it('should return query string when list of values provided', () => {
  const res = new QParam('Summary', ['foo', 'bar']).buildQuery();

  expect(res).toBe(`"Summary": "foo", "bar"`);
});
