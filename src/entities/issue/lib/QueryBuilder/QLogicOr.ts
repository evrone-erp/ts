import { QLogicBase } from 'entities/issue/lib/QueryBuilder/QLogicBase';
import { IQueryParam } from './IQueryParam';

export class QLogicOr extends QLogicBase {
  constructor(...children: IQueryParam[]) {
    super('OR', ...children);
  }
}
