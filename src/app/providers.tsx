import { store } from 'app/store';
import { Provider as ReduxProvider } from 'react-redux';
import { PropsWithChildren } from 'react';
import { LocaleProvider } from 'entities/locale/ui/LocaleProvider';
import { useCurrentLocale } from 'entities/locale/lib/hooks';
import { isRuLocale } from 'entities/locale/lib/helpers';
import ruLocale from 'antd/lib/locale/ru_RU';
import { ConfigProvider as AntdConfigProvider } from 'antd';

const AntdProvider = ({ children }: PropsWithChildren) => {
  const currentLocale = useCurrentLocale();
  const antdLocale = isRuLocale(currentLocale) ? ruLocale : undefined;

  return (
    <AntdConfigProvider
      locale={antdLocale}
      theme={{
        token: {
          fontFamily: "'Inter', sans-serif",
          borderRadius: 2,
        },
      }}
    >
      {children}
    </AntdConfigProvider>
  );
};

export const RootProvider = ({ children }: PropsWithChildren) => (
  <ReduxProvider store={store}>
    <LocaleProvider>
      <AntdProvider>{children}</AntdProvider>
    </LocaleProvider>
  </ReduxProvider>
);
