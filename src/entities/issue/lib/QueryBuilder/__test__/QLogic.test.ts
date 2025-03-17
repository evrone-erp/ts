import { QLogic } from 'entities/issue/lib/QueryBuilder/QLogic';
import { QParam } from 'entities/issue/lib/QueryBuilder/QParam';

describe('AND', () => {
  it('should return empty string when children params return nothing', () => {
    const res = new QLogic.AND(
      new QParam('Assignee', undefined),
      new QParam('Assignee', ''),
      new QParam('Assignee', []),
    ).buildQuery();

    expect(res).toBe('');
  });

  it('should return provided parameter when only 1 parameter is provided', () => {
    const res = new QLogic.AND(new QParam('Assignee', 'foo')).buildQuery();

    expect(res).toBe(`"Assignee": "foo"`);
  });

  it('should return provided parameter when only 1 parameter with value is provided', () => {
    const res = new QLogic.AND(new QParam('Assignee', 'foo'), new QParam('Key', undefined)).buildQuery();

    expect(res).toBe(`"Assignee": "foo"`);
  });

  it('should build query with operator', () => {
    const res = new QLogic.AND(
      new QParam('Assignee', 'foo'),
      new QParam('Created', 'bar'),
      new QParam('Key', ['test-1', 'test-2']),
      new QParam('Updated', undefined),
    ).buildQuery();

    expect(res).toBe(`("Assignee": "foo" AND "Created": "bar" AND "Key": "test-1", "test-2")`);
  });
});

describe('OR', () => {
  it('should return empty string when children params return nothing', () => {
    const res = new QLogic.OR(
      new QParam('Assignee', undefined),
      new QParam('Assignee', ''),
      new QParam('Assignee', []),
    ).buildQuery();

    expect(res).toBe('');
  });

  it('should return provided parameter when only 1 parameter is provided', () => {
    const res = new QLogic.OR(new QParam('Assignee', 'foo')).buildQuery();

    expect(res).toBe(`"Assignee": "foo"`);
  });

  it('should return provided parameter when only 1 parameter with value is provided', () => {
    const res = new QLogic.OR(new QParam('Assignee', 'foo'), new QParam('Key', undefined)).buildQuery();

    expect(res).toBe(`"Assignee": "foo"`);
  });

  it('should build query with operator', () => {
    const res = new QLogic.OR(
      new QParam('Assignee', 'foo'),
      new QParam('Created', 'bar'),
      new QParam('Key', ['test-1', 'test-2']),
      new QParam('Updated', undefined),
    ).buildQuery();

    expect(res).toBe(`("Assignee": "foo" OR "Created": "bar" OR "Key": "test-1", "test-2")`);
  });
});
