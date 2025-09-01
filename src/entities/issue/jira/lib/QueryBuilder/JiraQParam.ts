import { AbstractQParam } from 'entities/issue/common/lib/QueryBuilder';
import { TQParamOperator } from 'entities/issue/common/lib/QueryBuilder/AbstractQParam';

export class JiraQParam extends AbstractQParam {
  constructor(
    protected name: string,
    value: string | undefined | string[],
    protected operator: TQParamOperator = '=',
  ) {
    super(name, value, operator);
  }

  buildQuery(): string {
    if (this.value.length === 0) {
      return '';
    }

    if (this.value.length === 1) {
      return `${this.name} ${this.operator} "${this.value[0]}"`;
    }

    const resultValueStr = this.value.map((v) => `"${v}"`).join(', ');

    return `${this.name} in (${resultValueStr})`;
  }
}
