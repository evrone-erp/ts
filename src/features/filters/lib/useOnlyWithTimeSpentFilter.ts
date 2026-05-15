import { useRouter } from 'next/router';

export const useOnlyWithTimeSpentFilter = () => {
  const router = useRouter();

  return router.query.only_with_time_spent as boolean | undefined;
};
