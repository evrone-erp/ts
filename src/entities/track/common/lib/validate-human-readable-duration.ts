import { HUMAN_DURATION_STR_REGEX, NUMBERS_REGEX } from 'entities/track/common/lib/constants';

export const validateHumanReadableDuration = (str: string | undefined) => {
  if (!str) {
    return false;
  }
  const trimmed = str.trim();

  const isNumbers = NUMBERS_REGEX.test(trimmed);
  // when user inputs numbers, assume it's the number of minutes
  if (isNumbers) {
    return true;
  }

  return !!trimmed && trimmed.match(HUMAN_DURATION_STR_REGEX) !== null;
};
