import { TJiraIssue } from 'entities/issue/jira/model/types';
import { TIssue } from 'entities/issue/common/model/types';

export const transformJiraIssueToCommonIssue = (issue: TJiraIssue): TIssue => ({
  ...issue,
  summary: issue.fields.summary,
  status: {
    id: issue.fields.status.id,
    display: issue.fields.status.name,
    key: issue.fields.status.name,
  },
});

export const transformJiraIssuesToCommonIssues = (issues: TJiraIssue[]): TIssue[] =>
  issues.map(transformJiraIssueToCommonIssue);
