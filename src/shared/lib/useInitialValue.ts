import { useMemo } from 'react';

// !!eslint is disabled on purpose!!
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useInitialValue = <T>(initialValue: T) => useMemo(() => initialValue, []);
