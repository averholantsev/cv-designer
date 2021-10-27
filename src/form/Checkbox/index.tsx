import {
  FormControl,
  FormControlLabelProps,
  FormGroup,
  FormHelperText,
  FormLabel,
  makeStyles
} from '@material-ui/core';
import { CheckboxBase } from 'components';
import React, { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface ICheckboxProps extends Omit<FormControlLabelProps, 'name' | 'control'> {
  name: string;
  title: string;
  helperText?: string;
}

const useStyles = makeStyles(({ colors }) => ({
  title: {
    fontSize: 14,
    color: colors.greyRaven
  },
  focused: {
    color: `${colors.greyRaven} !important`
  }
}));

const Checkbox: FC<ICheckboxProps> = ({ name, title, helperText, ...props }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const {
    field: { ref, value, ...otherFieldProps },
    fieldState: { invalid }
  } = useController({
    name,
    control,
    defaultValue: false
  });

  const classes = useStyles();

  return (
    <FormControl component="fieldset" error={invalid}>
      <FormLabel component="label" classes={{ root: classes.title, focused: classes.focused }}>
        {title}
      </FormLabel>
      <FormGroup>
        <CheckboxBase checked={value} innerRef={ref} {...otherFieldProps} {...props} />
      </FormGroup>
      <FormHelperText>{errors[name]?.message || helperText}</FormHelperText>
    </FormControl>
  );
};

export default Checkbox;
