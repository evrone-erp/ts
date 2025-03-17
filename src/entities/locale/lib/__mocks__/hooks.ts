import { getMockLocalizedString } from '__mocks__/getMockLocalizedString';

export const useMessage = () => (key: string, val: { value: string } | undefined) =>
  getMockLocalizedString(key, val ? val.value : val);
