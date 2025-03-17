import { getMockLocalizedString } from '__mocks__/getMockLocalizedString';

interface IMockMessageProps {
  id: string;
}

export const Message = ({ id }: IMockMessageProps) => getMockLocalizedString(id);
