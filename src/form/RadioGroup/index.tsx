import { IRadioGroupBaseProps, RadioGroupBase } from 'components';
import React, { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface IRadioGroupProps extends Omit<IRadioGroupBaseProps, 'onChange' | 'value'> {
  name: string;
}

const RadioGroup: FC<IRadioGroupProps> = ({ name, ...props }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const {
    field: { ref, ...otherProps },
    fieldState: { invalid }
  } = useController({
    name,
    control,
    defaultValue: null
  });

  const helperText = errors[name]?.message?.toString();

  return (
    <RadioGroupBase
      {...props}
      {...otherProps}
      radioProps={{ ref: ref }}
      name={name}
      helperText={helperText}
      error={invalid}
    />
  );
};

export default RadioGroup;
