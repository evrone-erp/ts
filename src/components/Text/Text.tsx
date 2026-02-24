import { Typography } from 'antd';
import type { TextProps as AntTextProps } from 'antd/lib/typography/Text';
import type { PropsWithChildren } from 'react';

interface ITextProps extends AntTextProps {
  fw?: number;
  fs?: number;
  lh?: number;
  color?: string;
}

export const Text = ({
  fw = 400,
  fs = 14,
  lh = 17,
  color = 'inherit',
  style,
  ...restProps
}: PropsWithChildren<ITextProps>) => (
  <Typography.Text
    {...restProps}
    style={{
      fontWeight: fw,
      fontSize: `${fs}px`,
      lineHeight: `${lh}px`,
      color,
      ...style,
    }}
  />
);
