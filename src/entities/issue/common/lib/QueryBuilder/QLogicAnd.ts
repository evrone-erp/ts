import { QLogicBase } from 'entities/issue/common/lib/QueryBuilder/QLogicBase';
import { IQueryParam } from 'entities/issue/common/lib/QueryBuilder/IQueryParam';

export class QLogicAnd extends QLogicBase {
  constructor(...children: IQueryParam[]) {
    super('AND', ...children);
  }
}
