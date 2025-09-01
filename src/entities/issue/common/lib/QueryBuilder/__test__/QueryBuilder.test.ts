import { QueryBuilder } from 'entities/issue/common/lib/QueryBuilder/QueryBuilder';
import { YandexQSorting } from 'entities/issue/yandex/lib/QueryBuilder/YandexQSorting';
import { YandexQParam } from 'entities/issue/yandex/lib/QueryBuilder/YandexQParam';

describe('should return empty string when', () => {
  it('no child params provided', () => {
    const res = new QueryBuilder().buildQuery();

    expect(res).toEqual('');
  });

  it('child param with empty value provided', () => {
    const res1 = new QueryBuilder(new YandexQParam('Key', undefined)).buildQuery();
    expect(res1).toEqual('');

    const res2 = new QueryBuilder(new YandexQParam('Key', [])).buildQuery();
    expect(res2).toEqual('');
  });

  it('child params with empty values provided', () => {
    const res = new QueryBuilder(
      new YandexQParam('Key', undefined),
      new YandexQParam('Key', ''),
      new YandexQParam('Key', []),
    ).buildQuery();

    expect(res).toEqual('');
  });
});

describe('should return query when', () => {
  it('parameter is provided', () => {
    const res = new QueryBuilder(new YandexQParam('Key', 'foo')).buildQuery();

    expect(res).toEqual(`"Key": "foo"`);
  });

  it('several parameters provided', () => {
    const res = new QueryBuilder(
      new YandexQParam('Created', undefined),
      new YandexQParam('Summary', 'foo'),
      new YandexQParam('Assignee', ['bar', 'baz']),
      new YandexQParam('Key', ''),
    ).buildQuery();
    expect(res).toEqual(`"Summary": "foo" "Assignee": "bar", "baz"`);
  });

  it('when parameters and sorting provided', () => {
    const res = new QueryBuilder(
      new YandexQParam('Created', undefined),
      new YandexQParam('Summary', 'foo'),
      new YandexQParam('Assignee', ['bar', 'baz']),
      new YandexQParam('Key', ''),
      new YandexQSorting('Summary', 'DESC'),
    ).buildQuery();
    expect(res).toEqual(`"Summary": "foo" "Assignee": "bar", "baz" "Sort by": Summary DESC`);
  });

  it('when parameters and empty sorting provided', () => {
    const res = new QueryBuilder(
      new YandexQParam('Created', undefined),
      new YandexQParam('Summary', 'foo'),
      new YandexQParam('Assignee', ['bar', 'baz']),
      new YandexQParam('Key', ''),
      new YandexQSorting(),
    ).buildQuery();
    expect(res).toEqual(`"Summary": "foo" "Assignee": "bar", "baz"`);
  });
});
