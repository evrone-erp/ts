import { useRouter } from 'next/router';

export const useShowWeekends = () => {
  const router = useRouter();
  const showWeekends = Boolean(Number(router.query.weekends || '1'));

  return showWeekends;
};
