import { QLogic } from 'entities/issue/common/lib/QueryBuilder/QLogic';
import { YandexQParam } from 'entities/issue/yandex/lib/QueryBuilder/YandexQParam';

describe('AND', () => {
  it('should return empty string when children params return nothing', () => {
    const res = new QLogic.AND(
      new YandexQParam('Assignee', undefined),
      new YandexQParam('Assignee', ''),
      new YandexQParam('Assignee', []),
    ).buildQuery();

    expect(res).toBe('');
  });

  it('should return provided parameter when only 1 parameter is provided', () => {
    const res = new QLogic.AND(new YandexQParam('Assignee', 'foo')).buildQuery();

    expect(res).toBe(`"Assignee": "foo"`);
  });

  it('should return provided parameter when only 1 parameter with value is provided', () => {
    const res = new QLogic.AND(new YandexQParam('Assignee', 'foo'), new YandexQParam('Key', undefined)).buildQuery();

    expect(res).toBe(`"Assignee": "foo"`);
  });

  it('should build query with operator', () => {
    const res = new QLogic.AND(
      new YandexQParam('Assignee', 'foo'),
      new YandexQParam('Created', 'bar'),
      new YandexQParam('Key', ['test-1', 'test-2']),
      new YandexQParam('Updated', undefined),
    ).buildQuery();

    expect(res).toBe(`("Assignee": "foo" AND "Created": "bar" AND "Key": "test-1", "test-2")`);
  });
});

describe('OR', () => {
  it('should return empty string when children params return nothing', () => {
    const res = new QLogic.OR(
      new YandexQParam('Assignee', undefined),
      new YandexQParam('Assignee', ''),
      new YandexQParam('Assignee', []),
    ).buildQuery();

    expect(res).toBe('');
  });

  it('should return provided parameter when only 1 parameter is provided', () => {
    const res = new QLogic.OR(new YandexQParam('Assignee', 'foo')).buildQuery();

    expect(res).toBe(`"Assignee": "foo"`);
  });

  it('should return provided parameter when only 1 parameter with value is provided', () => {
    const res = new QLogic.OR(new YandexQParam('Assignee', 'foo'), new YandexQParam('Key', undefined)).buildQuery();

    expect(res).toBe(`"Assignee": "foo"`);
  });

  it('should build query with operator', () => {
    const res = new QLogic.OR(
      new YandexQParam('Assignee', 'foo'),
      new YandexQParam('Created', 'bar'),
      new YandexQParam('Key', ['test-1', 'test-2']),
      new YandexQParam('Updated', undefined),
    ).buildQuery();

    expect(res).toBe(`("Assignee": "foo" OR "Created": "bar" OR "Key": "test-1", "test-2")`);
  });
});
