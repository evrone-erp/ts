import { AbstractQSorting } from 'entities/issue/common/lib/QueryBuilder/AbstractQSorting';

export class JiraQSorting extends AbstractQSorting {
  buildQuery(): string {
    if (!this.name || !this.order) {
      return '';
    }

    return `order by ${this.name} ${this.order}`;
  }
}
