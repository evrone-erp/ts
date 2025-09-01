import { DateWrapper } from 'features/date/lib/DateWrapper';
import { STARTED_DATE_TIME_JIRA_API } from 'features/date/lib/constants';

export const dateToJiraStartedDate = (date: string, utcOffsetInMinutes?: number) =>
  DateWrapper.getDate({ date, utcOffsetInMinutes }).format(STARTED_DATE_TIME_JIRA_API);
