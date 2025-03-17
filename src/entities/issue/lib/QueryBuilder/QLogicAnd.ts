import { QLogicBase } from 'entities/issue/lib/QueryBuilder/QLogicBase';
import { IQueryParam } from './IQueryParam';

export class QLogicAnd extends QLogicBase {
  constructor(...children: IQueryParam[]) {
    super('AND', ...children);
  }
}
