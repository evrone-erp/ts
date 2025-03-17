import React, { FC } from 'react';
import { Spin } from 'antd';
import styles from './Loading.module.scss';

type TProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
};

export const Loading: FC<TProps> = ({ children, isLoading }) => {
  if (typeof isLoading === 'undefined') {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
};
