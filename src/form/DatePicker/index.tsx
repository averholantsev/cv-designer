import { DatePickerProps } from '@material-ui/pickers';
import { DatePickerBase } from 'components';
import React, { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface IDatePickerProps extends Omit<DatePickerProps, 'onChange' | 'value'> {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const DatePicker: FC<IDatePickerProps> = ({ name, label, placeholder, required, ...props }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const {
    field: { ref, ...fieldProps },
    fieldState: { invalid }
  } = useController({
    name,
    control,
    defaultValue: null
  });

  return (
    <DatePickerBase
      {...props}
      {...fieldProps}
      name={name}
      FieldProps={{
        error: invalid,
        helperText: errors[name]?.message,
        label,
        placeholder,
        required,
        ref: ref
      }}
    />
  );
};

export default DatePicker;
