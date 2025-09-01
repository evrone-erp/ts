import { IQueryParam } from 'entities/issue/common/lib/QueryBuilder/IQueryParam';

export type TQParamOperator = '' | '>' | '<' | '>=' | '<=' | '!' | '=' | '~';

export abstract class AbstractQParam implements IQueryParam {
  protected value: string[];

  constructor(
    protected name: string,
    value: string | undefined | string[],
    protected operator: TQParamOperator = '',
  ) {
    if (Array.isArray(value)) {
      this.value = value;
      return;
    }
    this.value = value ? [value] : [];
  }

  abstract buildQuery(): string;
}
