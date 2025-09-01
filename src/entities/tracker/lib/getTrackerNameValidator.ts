import { getTrackerIdFromName } from 'entities/tracker/lib/getTrackerIdFromName';

type TOptions = {
  isEditing: boolean;
  existingTrackerIds: string[];
  uniqueError: string;
  emptyError: string;
  trackerId?: string;
};

export const getTrackerNameValidator =
  ({ isEditing, existingTrackerIds, uniqueError, emptyError, trackerId }: TOptions) =>
  async (_: unknown, value: string) => {
    if (!value.trim()) {
      return Promise.reject(new Error(emptyError));
    }

    const valueAsId = getTrackerIdFromName(value);

    if (isEditing && valueAsId === trackerId) {
      return Promise.resolve();
    }

    if (existingTrackerIds.includes(valueAsId)) {
      return Promise.reject(new Error(uniqueError));
    }
    return Promise.resolve();
  };
