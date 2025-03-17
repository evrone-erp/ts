import { PropsWithChildren, useEffect, useState } from 'react';
import { RootProvider } from 'app/providers';

export const CSRApp = ({ children }: PropsWithChildren) => {
  const [shouldRender, setShouldRender] = useState(() => false);

  useEffect(() => {
    setShouldRender(() => true);
  }, []);

  if (!shouldRender) return null;

  return <RootProvider>{children}</RootProvider>;
};
