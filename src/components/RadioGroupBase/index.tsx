import {
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps
} from '@material-ui/core';
import React, { FC } from 'react';

import { useStyles } from './styles';

type IRadioListType = {
  value: string;
  label: string;
};

export interface IRadioGroupBaseProps extends RadioGroupProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  radioList: IRadioListType[];
  formControlProps: FormControlProps<'fieldset'>;
  radioProps?: RadioProps;
}

export const RadioGroupBase: FC<IRadioGroupBaseProps> = ({
  label,
  error,
  helperText,
  radioList,
  formControlProps,
  radioProps,
  ...props
}) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset" {...formControlProps}>
      <FormLabel
        component="label"
        focused={false}
        classes={{ root: classes.label, asterisk: classes.required }}
      >
        {label}
      </FormLabel>
      <RadioGroup {...props} classes={{ root: classes.radioGroup }}>
        {radioList.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            label={item.label}
            control={<Radio size="small" {...radioProps} />}
            classes={{ root: classes.radio, label: classes.radioLabel }}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
