export const isClient = typeof window !== 'undefined';

export const appPaths = {
  home: '/',
  trackers: '/trackers',
  tracker: (id: string) => `/sheet/${id}`,
  token: '/token',
  jiraToken: '/jira-token',
};
