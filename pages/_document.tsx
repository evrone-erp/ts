import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

const font = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons&display=swap';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="yes" name="apple-touch-fullscreen" />
          <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />

          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
          <link rel="manifest" href="/favicon/manifest.webmanifest" />

          <link rel="stylesheet" href={font} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
