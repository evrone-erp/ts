import { TIssueKey } from 'entities/issue/model/types';
import { TSortOrder } from 'shared/lib/types';
import { IQueryParam } from './IQueryParam';

export class QSorting implements IQueryParam {
  constructor(
    private name?: TIssueKey | string,
    private order?: TSortOrder,
  ) {}

  buildQuery(): string {
    if (!this.name || !this.order) {
      return '';
    }

    return `"Sort by": ${this.name} ${this.order}`;
  }
}
