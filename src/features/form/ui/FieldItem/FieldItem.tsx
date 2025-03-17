import { clsx } from 'clsx';
import React, { PropsWithChildren } from 'react';
import { Error } from 'features/form/ui/Error';

import styles from './FieldItem.module.scss';

type TProps = {
  label?: string;
  error?: string;
  className?: string;
};

export const FieldItem = ({ label, className, error = '', children }: PropsWithChildren<TProps>) => (
  <label className={clsx(styles.fieldItem, className)}>
    {label && <span className={styles.label}>{label}</span>}
    {children}
    <Error error={error} />
  </label>
);
