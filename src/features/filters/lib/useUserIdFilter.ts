import { useRouter } from 'next/router';

export const useUserIdFilter = () => {
  const router = useRouter();

  const userId = router.query.user_id as string | undefined;

  return userId;
};
