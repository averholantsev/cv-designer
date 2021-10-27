import { FormControl, FormGroup, FormHelperText, FormLabel, makeStyles } from '@material-ui/core';
import React, { FC, ReactNode } from 'react';

interface ICheckboxWrapperProps {
  label: string;
  helperText?: string;
  children: ReactNode;
}

const useStyles = makeStyles(({ colors, spacing }) => ({
  title: {
    fontSize: 14,
    color: colors.greyRaven,
    marginBottom: spacing(0.625)
  },
  focused: {
    color: `${colors.greyRaven} !important`
  },
  formGroup: {
    marginLeft: spacing(1.5)
  }
}));

export const CheckboxWrapper: FC<ICheckboxWrapperProps> = ({ label, children, helperText }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <FormLabel component="label" classes={{ root: classes.title, focused: classes.focused }}>
        {label}
      </FormLabel>
      <FormGroup row className={classes.formGroup}>
        {children}
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
