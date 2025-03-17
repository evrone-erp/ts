import { useRouter } from 'next/router';

export const useSummaryFilter = () => {
  const router = useRouter();

  const summary = router.query.summary as string | undefined;

  return summary;
};
