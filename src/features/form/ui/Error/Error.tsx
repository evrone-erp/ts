import { Typography } from 'antd';
import type { FC } from 'react';
import React from 'react';

type TProps = {
  error?: string;
};

export const Error: FC<TProps> = ({ error }) => (
  <>{error && <Typography.Text type="danger">{error}</Typography.Text>}</>
);
