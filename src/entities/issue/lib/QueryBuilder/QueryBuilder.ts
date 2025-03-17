import { IQueryParam } from './IQueryParam';

export class QueryBuilder implements IQueryParam {
  private childParams: IQueryParam[];

  constructor(...args: IQueryParam[]) {
    this.childParams = args;
  }

  buildQuery(): string {
    return this.childParams
      .map((c) => c.buildQuery())
      .filter(Boolean)
      .join(' ');
  }
}
