import { DateWrapper } from 'features/date/lib/DateWrapper';
import { DATE_FORMAT_DATE, DATE_TIME_FORMAT_JIRA_API } from 'features/date/lib/constants';
import { QLogic, QueryBuilder } from 'entities/issue/common/lib/QueryBuilder';
import { JiraQParam } from 'entities/issue/jira/lib/QueryBuilder/JiraQParam';
import { TGetIssuesParams, TGetUserIssuesParams, TSearchIssuesParams } from 'entities/issue/common/model/types';
import { JiraQSorting } from 'entities/issue/jira/lib/QueryBuilder/JiraQSorting';

const isGetUserIssuesParams = (x: TGetIssuesParams): x is TGetUserIssuesParams =>
  Object.hasOwn(x, 'from') && Object.hasOwn(x, 'to');

const isSearchIssuesParams = (x: TGetIssuesParams): x is TSearchIssuesParams => Object.hasOwn(x, 'search');

const getUserIssuesQuery = ({
  from,
  to,
  user,
  sortBy,
  sortOrder,
  utcOffsetInMinutes,
  queue,
  statusList,
  includeIssues,
  summary,
}: TGetUserIssuesParams) => {
  const dateFrom = DateWrapper.getDate({ date: from, utcOffsetInMinutes });
  const dateTo = DateWrapper.getDate({ date: to, utcOffsetInMinutes });

  const dateFormattedFrom = DateWrapper.getDateFormat(dateFrom, DATE_FORMAT_DATE, utcOffsetInMinutes);
  const dateTimeFormattedFrom = DateWrapper.getDateFormat(dateFrom, DATE_TIME_FORMAT_JIRA_API, utcOffsetInMinutes);
  const dateFormattedTo = DateWrapper.getDateFormat(dateTo, DATE_FORMAT_DATE, utcOffsetInMinutes);
  const dateTimeFormattedTo = DateWrapper.getDateFormat(dateTo, DATE_TIME_FORMAT_JIRA_API, utcOffsetInMinutes);

  const issuesAssignedToUser = new QLogic.AND(
    new JiraQParam('Assignee', String(user)),
    new JiraQParam('Updated', dateTimeFormattedFrom, '>='),
    new JiraQParam('Updated', dateTimeFormattedTo, '<='),
  );

  const issueWithLoggedWorkByUser = new QLogic.AND(
    new JiraQParam('worklogAuthor', String(user)),
    new JiraQParam('worklogDate', dateFormattedFrom, '>='),
    new JiraQParam('worklogDate', dateFormattedTo, '<='),
  );

  const includedExtraIssues = new JiraQParam('issueKey', includeIssues);

  const allIssues = new QLogic.OR(issuesAssignedToUser, issueWithLoggedWorkByUser, includedExtraIssues);

  const allIssuesWithFilters = new QLogic.AND(
    allIssues,
    new JiraQParam('project', queue),
    new JiraQParam('status', statusList),
    new JiraQParam('Summary', summary, '~'),
  );

  const queryBuilder = new QueryBuilder(allIssuesWithFilters, new JiraQSorting(sortBy, sortOrder));

  return queryBuilder.buildQuery();
};

const getSearchIssuesQuery = ({ search }: TSearchIssuesParams) =>
  new QueryBuilder(
    new QLogic.OR(new JiraQParam('Summary', search, '~'), new JiraQParam('issueKey', search?.toUpperCase())),
  ).buildQuery();

export const createJiraIssueRequest = (params: TGetIssuesParams) => {
  let query: string | undefined;

  if (isSearchIssuesParams(params)) {
    query = getSearchIssuesQuery(params);
  } else if (isGetUserIssuesParams(params)) {
    query = getUserIssuesQuery(params);
  }

  if (!query) {
    console.error('Possible error! Query for issues request was not constructed!');
  }

  return query;
};
