import { api } from 'shared/api';
import { TGetQueuesParams, TQueue } from 'entities/queue/common/model/types';
import { getTrackerHeaders } from 'entities/tracker/lib/getTrackerHeaders';
import { yandexQueueEndpoints } from 'entities/queue/yandex/model/endpoints';

export const yandexQueueApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getQueues: build.query<TQueue[], TGetQueuesParams>({
      query: ({ tracker }) => ({
        url: yandexQueueEndpoints.queues,
        headers: getTrackerHeaders(tracker),
      }),
    }),
  }),
});
