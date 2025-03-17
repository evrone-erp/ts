import { api } from 'shared/api';
import { TQueue } from 'entities/queue/model/types';

export const queueApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getQueues: build.query<TQueue[], void>({
      query: () => ({
        url: `/tracker/v2/queues`,
      }),
    }),
  }),
});
