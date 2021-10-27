import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
  makeStyles
} from '@material-ui/core';
import React, { FC } from 'react';

export interface ICheckboxButtonBaseProps extends Omit<FormControlLabelProps, 'control'> {
  checkboxProps?: CheckboxProps;
}

const useStyles = makeStyles(({ colors, spacing }) => ({
  root: {
    position: 'relative',
    marginRight: spacing(1.25),
    border: `1px solid ${colors.linkLightSecondary}`
  },
  label: {
    fontSize: 14,
    position: 'absolute',
    width: 35,
    height: 30,
    textAlign: 'center',
    lineHeight: '30px'
  },
  box: {
    width: 35,
    height: 30,
    backgroundColor: colors.linkWater,
    borderRadius: 0,

    '&:hover': {
      backgroundColor: colors.linkLightSecondary
    }
  },
  boxChecked: {
    backgroundColor: colors.greyHeather,
    borderTop: `4px solid ${colors.linkLightSecondary}`,

    '&:hover': {
      backgroundColor: `${colors.linkLightSecondary} !important`
    }
  }
}));

export const CheckboxButtonBase: FC<ICheckboxButtonBaseProps> = ({ checkboxProps, ...props }) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...checkboxProps}
          icon={<span></span>}
          checkedIcon={<span></span>}
          classes={{ root: classes.box, checked: classes.boxChecked }}
        />
      }
      classes={{ root: classes.root, label: classes.label }}
      {...props}
    />
  );
};
