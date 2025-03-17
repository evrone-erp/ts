import { useRouter } from 'next/router';
import { TSortOrder } from 'shared/lib/types';

export const useSorting = () => {
  const router = useRouter();

  const sortBy = router.query.sort_by as string | undefined;
  const sortOrder = (router.query.sort_order as TSortOrder | undefined) ?? 'ASC';

  return { sortBy, sortOrder };
};
