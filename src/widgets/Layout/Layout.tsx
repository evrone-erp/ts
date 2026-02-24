import type { FC } from 'react';
import React from 'react';
import styles from './Layout.module.scss';

type TProps = {
  head?: React.ReactNode;
  children: React.ReactNode;
};

export const Layout: FC<TProps> = ({ children, head }) => (
  <div className={styles.Layout}>
    {head}
    <main className={styles.Layout__Main}>{children}</main>
  </div>
);
