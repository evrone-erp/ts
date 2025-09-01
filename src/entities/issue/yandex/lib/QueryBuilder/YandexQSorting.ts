import { AbstractQSorting } from 'entities/issue/common/lib/QueryBuilder/AbstractQSorting';

export class YandexQSorting extends AbstractQSorting {
  buildQuery(): string {
    if (!this.name || !this.order) {
      return '';
    }

    return `"Sort by": ${this.name} ${this.order}`;
  }
}
