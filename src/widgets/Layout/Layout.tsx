import React, { FC } from 'react';
import './Layout.scss';

type TProps = {
  head?: React.ReactNode;
  children: React.ReactNode;
};

export const Layout: FC<TProps> = ({ children, head }) => (
  <div className="Layout">
    {head}
    <main className="Layout__Main">{children}</main>
  </div>
);
