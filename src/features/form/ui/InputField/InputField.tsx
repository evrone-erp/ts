import { InputProps, Input } from 'antd';
import { FieldItem } from 'features/form/ui/FieldItem';
import React, { useCallback } from 'react';
import { useField } from 'react-final-form';

type TProps = Omit<InputProps, 'status'> & {
  name: string;
  label?: string;
  fieldClassName?: string;
  displayError?: boolean | 'onlyDirty';
  displayErrorStatus?: boolean | 'onlyDirty';
};

export const InputField = ({
  name,
  label,
  fieldClassName,
  displayError = true,
  displayErrorStatus = true,
  onBlur,
  ...inputProps
}: TProps) => {
  const { input, meta } = useField<string>(name);
  const inputOnBlur = input.onBlur;

  const error = meta.error || meta.submitError;
  const shouldDisplayError = typeof displayError === 'boolean' ? displayError : !!meta.dirty;
  const shouldDisplayErrorStatus = typeof displayErrorStatus === 'boolean' ? displayErrorStatus : !!meta.dirty;

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      inputOnBlur(e);
      onBlur?.(e);
    },
    [onBlur, inputOnBlur],
  );

  return (
    <FieldItem label={label} error={shouldDisplayError ? error : undefined} className={fieldClassName}>
      <Input
        {...inputProps}
        {...input}
        onBlur={handleBlur}
        status={shouldDisplayErrorStatus && error ? 'error' : undefined}
        aria-label={name}
      />
    </FieldItem>
  );
};
