export const getMockLocalizedString = (key: string, value = '') => {
  const map = {
    'date.hours.short': `${value}ч`,
    'date.minutes.short': `${value}м`,
    'date.seconds.short': `${value}с`,
    'issue.total': 'Всего задач',
    'share.create.action': 'Создать',
  };

  return map[key as keyof typeof map] ?? 'default mock message';
};
