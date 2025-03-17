import NextHead from 'next/head';
import React, { FC } from 'react';

type TProps = {
  children?: React.ReactNode;
  description?: string;
  keywords?: string;
  title: string;
};

const viewport = [
  'initial-scale=1.0',
  'maximum-scale=1.0',
  'minimum-scale=1.0',
  'user-scalable=no',
  'viewport-fit=cover',
  'width=device-width',
].join(', ');

export const Head: FC<TProps> = ({ children, description = '', keywords = '', title }) => (
  <NextHead>
    <meta content={viewport} name="viewport" />

    <meta content={description} name="description" />
    <meta content={keywords} name="keywords" />
    <meta content={title} name="title" />

    <meta content={description} property="og:description" />
    <meta content="/logo.svg" property="og:image" />
    <meta content={title} property="og:title" />
    <meta content="website" property="og:type" />

    <meta content="summary_large_image" property="twitter:card" />
    <meta content={description} property="twitter:description" />
    <meta content="/logo.svg" property="twitter:image" />
    <meta content={title} property="twitter:title" />

    <title>{title}</title>

    {children}
  </NextHead>
);
