import { TIssue } from 'entities/issue/model/types';
import { configApi } from 'entities/config/model/api';

export const useTrackerUrl = (issueItem: TIssue | undefined): string => {
  const { trackerUrl } = configApi.useGetConfigQuery(undefined, {
    selectFromResult: (state) => ({
      trackerUrl: state.data?.trackerUrl,
    }),
  });

  if (!issueItem) {
    return '';
  }

  return `${trackerUrl}${issueItem.key}`;
};
