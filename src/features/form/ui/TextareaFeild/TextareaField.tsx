import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import { clsx } from 'clsx';
import { FieldItem } from 'features/form/ui/FieldItem';
import React from 'react';
import { useField } from 'react-final-form';

type TProps = Omit<TextAreaProps, 'status'> & {
  name: string;
  label: string;
  fieldClassName?: string;
};

export const TextareaField = ({ name, label, fieldClassName, ...textAreaProps }: TProps) => {
  const { input, meta } = useField<string>(name);

  const error = meta.error || meta.submitError;

  return (
    <FieldItem label={label} error={error} className={fieldClassName}>
      <Input.TextArea {...textAreaProps} {...input} status={clsx({ warning: error }) as 'warning' | undefined} />
    </FieldItem>
  );
};
