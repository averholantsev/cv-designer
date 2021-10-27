import { FormControlLabelProps } from '@material-ui/core';
import { CheckboxButtonBase } from 'components';
import React, { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface ICheckboxButtonProps extends Omit<FormControlLabelProps, 'name' | 'control'> {
  name: string;
}

const CheckboxButton: FC<ICheckboxButtonProps> = ({ name, ...props }) => {
  const { control } = useFormContext();

  const {
    field: { ref, value, ...otherFieldProps }
  } = useController({
    name,
    control,
    defaultValue: false
  });

  return <CheckboxButtonBase innerRef={ref} checked={value} {...otherFieldProps} {...props} />;
};

export default CheckboxButton;
