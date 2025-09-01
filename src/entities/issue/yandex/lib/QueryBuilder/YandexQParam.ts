import { AbstractQParam } from 'entities/issue/common/lib/QueryBuilder';

export class YandexQParam extends AbstractQParam {
  buildQuery(): string {
    if (this.value.length === 0) {
      return '';
    }

    const resultValueStr = this.value.map((v) => `"${v}"`).join(', ');

    return `"${this.name}": ${this.operator}${resultValueStr}`;
  }
}
