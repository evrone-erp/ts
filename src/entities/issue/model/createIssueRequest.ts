import { DateWrapper } from 'features/date/lib/DateWrapper';
import { DATE_FORMAT_DATE_API } from 'features/date/lib/constants';
import { TGetIssuesParams, TGetUserIssuesParams, TSearchIssuesParams } from 'entities/issue/model/types';
import { QueryBuilder, QLogic, QParam } from 'entities/issue/lib/QueryBuilder';
import { QSorting } from 'entities/issue/lib/QueryBuilder/QSorting';

const isGetUserIssuesParams = (x: TGetIssuesParams): x is TGetUserIssuesParams =>
  Object.hasOwn(x, 'includeIssues') && Object.hasOwn(x, 'from') && Object.hasOwn(x, 'to');

const isSearchIssuesParams = (x: TGetIssuesParams): x is TSearchIssuesParams => Object.hasOwn(x, 'search');

const getUserIssuesQuery = ({
  from,
  to,
  includeIssues,
  userName,
  statusList,
  summary,
  queue,
  sortBy,
  sortOder,
  utcOffsetInMinutes,
}: TGetUserIssuesParams) => {
  const formattedFrom = DateWrapper.getDateFormat(
    DateWrapper.getDate({ date: from, utcOffsetInMinutes }),
    DATE_FORMAT_DATE_API,
    0,
  );
  const formattedTo = DateWrapper.getDateFormat(
    DateWrapper.getDate({ date: to, utcOffsetInMinutes }),
    DATE_FORMAT_DATE_API,
    0,
  );

  const assigneeParam = new QParam('Assignee', userName);

  const fromParam = new QLogic.OR(
    new QParam('Created', formattedFrom, '>='),
    new QParam('Updated', formattedFrom, '>='),
  );
  const toParam = new QLogic.OR(new QParam('Created', formattedTo, '<='), new QParam('Updated', formattedTo, '<='));

  const userIssuesForPeriodParam = new QLogic.AND(assigneeParam, fromParam, toParam);

  const keysParam = new QParam('Key', includeIssues);

  const queryBuilder = new QueryBuilder(
    new QLogic.OR(keysParam, userIssuesForPeriodParam),
    new QParam('Status', statusList),
    new QParam('Summary', summary),
    new QParam('Queue', queue),
    new QSorting(sortBy, sortOder),
  );

  return queryBuilder.buildQuery();
};

const getSearchIssuesQuery = ({ search }: TSearchIssuesParams) =>
  new QueryBuilder(
    new QLogic.OR(new QParam('Summary', search), new QParam('Key', search?.toUpperCase())),
    new QSorting('Summary', 'ASC'),
  ).buildQuery();

export const createIssueRequest = (params: TGetIssuesParams) => {
  let query: string | undefined;

  if (isGetUserIssuesParams(params)) {
    query = getUserIssuesQuery(params);
  } else if (isSearchIssuesParams(params)) {
    query = getSearchIssuesQuery(params);
  }

  if (!query) {
    console.error('Possible error! Query for issues request was not constructed!');
  }

  return { query };
};
