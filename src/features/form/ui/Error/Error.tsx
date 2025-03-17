import { Typography } from 'antd';
import React, { FC } from 'react';

type TProps = {
  error?: string;
};

export const Error: FC<TProps> = ({ error }) => (
  <>{error && <Typography.Text type="danger">{error}</Typography.Text>}</>
);
