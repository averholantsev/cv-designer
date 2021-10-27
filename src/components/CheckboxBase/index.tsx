import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
  makeStyles
} from '@material-ui/core';
import React, { FC } from 'react';

export interface ICheckboxBaseProps extends Omit<FormControlLabelProps, 'control'> {
  checkboxProps?: CheckboxProps;
}

const useStyles = makeStyles({
  label: {
    fontSize: 14
  }
});

export const CheckboxBase: FC<ICheckboxBaseProps> = ({ checkboxProps, ...props }) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      control={<Checkbox size="small" {...checkboxProps} />}
      classes={{ label: classes.label }}
      {...props}
    />
  );
};
