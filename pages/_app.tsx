import { CSRApp } from 'app/CSRapp';
import type { AppProps } from 'next/app';
import 'shared/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <CSRApp>
    <Component {...pageProps} />
  </CSRApp>
);

export default App;
