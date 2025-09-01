import { TIssue } from 'entities/issue/common/model/types';

export const sortWithPinedIssues = (pinnedIssueKeys: string[]) => (a: TIssue, b: TIssue) => {
  // do not sort issues on client, backend sends issues according to sorting we provided in request.
  // this code puts pinned issues at the top, but doesn't alter their original order
  const aWeight = pinnedIssueKeys.includes(a.key) ? 1 : 0;
  const bWeight = pinnedIssueKeys.includes(b.key) ? 1 : 0;
  return bWeight - aWeight;
};
