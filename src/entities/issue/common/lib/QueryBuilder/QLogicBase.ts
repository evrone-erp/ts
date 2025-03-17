import { IQueryParam } from 'entities/issue/common/lib/QueryBuilder/IQueryParam';

export class QLogicBase implements IQueryParam {
  private children: IQueryParam[];

  constructor(
    private operator: 'AND' | 'OR',
    ...children: IQueryParam[]
  ) {
    this.children = children;
  }

  buildQuery(): string {
    const childrenQueries = this.children.map((c) => c.buildQuery()).filter(Boolean);
    const childrenJoined = childrenQueries.join(` ${this.operator} `);

    if (childrenQueries.length <= 1) {
      return childrenJoined;
    }

    return `(${childrenJoined})`;
  }
}
