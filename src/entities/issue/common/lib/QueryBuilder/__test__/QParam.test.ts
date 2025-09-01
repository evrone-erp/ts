import { YandexQParam } from 'entities/issue/yandex/lib/QueryBuilder/YandexQParam';

describe('should return empty string', () => {
  it('if no value is provided', () => {
    const res = new YandexQParam('Summary', undefined, '!').buildQuery();

    expect(res).toBe('');
  });

  it('if provided value is empty array', () => {
    const res = new YandexQParam('Summary', [], '<').buildQuery();

    expect(res).toBe('');
  });

  it('if provided value is empty string', () => {
    const res = new YandexQParam('Summary', '', '>').buildQuery();

    expect(res).toBe('');
  });
});

it('should return query string', () => {
  const res = new YandexQParam('Summary', 'value').buildQuery();

  expect(res).toBe(`"Summary": "value"`);
});

it('should return query string with operator', () => {
  const res = new YandexQParam('Summary', 'value', '>=').buildQuery();

  expect(res).toBe(`"Summary": >="value"`);
});

it('should return query string when list of values provided', () => {
  const res = new YandexQParam('Summary', ['foo', 'bar']).buildQuery();

  expect(res).toBe(`"Summary": "foo", "bar"`);
});
