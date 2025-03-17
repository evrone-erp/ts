import { QueryBuilder } from 'entities/issue/lib/QueryBuilder/QueryBuilder';
import { QParam } from 'entities/issue/lib/QueryBuilder/QParam';
import { QSorting } from 'entities/issue/lib/QueryBuilder/QSorting';

describe('should return empty string when', () => {
  it('no child params provided', () => {
    const res = new QueryBuilder().buildQuery();

    expect(res).toEqual('');
  });

  it('child param with empty value provided', () => {
    const res1 = new QueryBuilder(new QParam('Key', undefined)).buildQuery();
    expect(res1).toEqual('');

    const res2 = new QueryBuilder(new QParam('Key', [])).buildQuery();
    expect(res2).toEqual('');
  });

  it('child params with empty values provided', () => {
    const res = new QueryBuilder(
      new QParam('Key', undefined),
      new QParam('Key', ''),
      new QParam('Key', []),
    ).buildQuery();

    expect(res).toEqual('');
  });
});

describe('should return query when', () => {
  it('parameter is provided', () => {
    const res = new QueryBuilder(new QParam('Key', 'foo')).buildQuery();

    expect(res).toEqual(`"Key": "foo"`);
  });

  it('several parameters provided', () => {
    const res = new QueryBuilder(
      new QParam('Created', undefined),
      new QParam('Summary', 'foo'),
      new QParam('Assignee', ['bar', 'baz']),
      new QParam('Key', ''),
    ).buildQuery();
    expect(res).toEqual(`"Summary": "foo" "Assignee": "bar", "baz"`);
  });

  it('when parameters and sorting provided', () => {
    const res = new QueryBuilder(
      new QParam('Created', undefined),
      new QParam('Summary', 'foo'),
      new QParam('Assignee', ['bar', 'baz']),
      new QParam('Key', ''),
      new QSorting('Summary', 'DESC'),
    ).buildQuery();
    expect(res).toEqual(`"Summary": "foo" "Assignee": "bar", "baz" "Sort by": Summary DESC`);
  });

  it('when parameters and empty sorting provided', () => {
    const res = new QueryBuilder(
      new QParam('Created', undefined),
      new QParam('Summary', 'foo'),
      new QParam('Assignee', ['bar', 'baz']),
      new QParam('Key', ''),
      new QSorting(),
    ).buildQuery();
    expect(res).toEqual(`"Summary": "foo" "Assignee": "bar", "baz"`);
  });
});
