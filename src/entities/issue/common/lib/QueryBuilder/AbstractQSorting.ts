import type { TSortOrder } from 'shared/lib/types';
import type { IQueryParam } from 'entities/issue/common/lib/QueryBuilder/IQueryParam';

export abstract class AbstractQSorting implements IQueryParam {
  constructor(
    protected name?: string,
    protected order?: TSortOrder,
  ) {}

  abstract buildQuery(): string;
}
