import { clsx } from 'clsx';
import { DatePicker } from 'components';
import dayjs, { Dayjs } from 'dayjs';
import { FieldItem } from 'features/form/ui/FieldItem';
import React, { ComponentProps, useCallback } from 'react';
import { useField } from 'react-final-form';

type TProps = Omit<ComponentProps<typeof DatePicker>, 'status' | 'onChange'> & {
  name: string;
  label?: string;
  showTime?: boolean;
  fieldClassName?: string;
  onChange?(): void;
};

export const DateInputField = ({
  name,
  label,
  showTime,
  allowClear = false,
  fieldClassName,
  onChange: onChangeProp,
  ...datePickerProps
}: TProps) => {
  const {
    input: { value, onChange, ...input },
    meta,
  } = useField<string>(name);

  const error = meta.error || meta.submitError;
  const handleChange = useCallback(
    (date: Dayjs | null) => {
      onChange(date?.format());
      onChangeProp?.();
    },
    [onChange, onChangeProp],
  );

  return (
    <FieldItem label={label} error={error} className={fieldClassName}>
      <DatePicker
        {...datePickerProps}
        {...input}
        changeOnBlur
        showTime={showTime}
        defaultValue={dayjs(value)}
        onChange={handleChange}
        allowClear={allowClear}
        status={clsx({ warning: error }) as 'warning' | undefined}
      />
    </FieldItem>
  );
};
