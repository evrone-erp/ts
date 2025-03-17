import { TIssueKey } from 'entities/issue/model/types';
import { IQueryParam } from './IQueryParam';

export class QParam implements IQueryParam {
  private value: string[];

  constructor(
    private name: TIssueKey,
    value: string | undefined | string[],
    private operator: '' | '>' | '<' | '>=' | '<=' | '!' = '',
  ) {
    if (Array.isArray(value)) {
      this.value = value;
      return;
    }
    this.value = value ? [value] : [];
  }

  buildQuery(): string {
    if (this.value.length === 0) {
      return '';
    }

    const resultValueStr = this.value.map((v) => `"${v}"`).join(', ');

    return `"${this.name}": ${this.operator}${resultValueStr}`;
  }
}
