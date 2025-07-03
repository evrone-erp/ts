import { fetchAllPages, TFetchAllPagesBaseQueryResult } from 'shared/api';
import { api } from 'shared/api';
import { identity } from 'shared/lib/utils';
import { TGetQueuesParams, TQueue } from 'entities/queue/common/model/types';
import { getTrackerHeaders } from 'entities/tracker/lib/getTrackerHeaders';
import { yandexQueueEndpoints } from 'entities/queue/yandex/model/endpoints';

export const yandexQueueApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getQueues: build.query<TQueue[], TGetQueuesParams>({
      async queryFn({ tracker }, __, ___, fetchWithBQ) {
        const res = await fetchAllPages(
          (page) =>
            fetchWithBQ({
              url: yandexQueueEndpoints.queues,
              params: { page, perPage: 100 },
              headers: getTrackerHeaders(tracker),
            }) as TFetchAllPagesBaseQueryResult<TQueue[]>,
          identity,
        );
        return res;
      },
    }),
  }),
});
