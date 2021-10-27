import { TextField, TextFieldProps } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { DatePicker as MuiDatePicker, DatePickerProps } from '@material-ui/pickers';
import React, { FC } from 'react';

import { useStyles } from './styles';

export interface IDatePickerProps extends DatePickerProps {
  FieldProps: TextFieldProps;
}

export const DatePickerBase: FC<IDatePickerProps> = ({ FieldProps, ...props }) => {
  const classes = useStyles();

  return (
    <MuiDatePicker
      {...props}
      clearable
      format="DD.MM.YYYY"
      inputVariant="outlined"
      InputProps={{
        startAdornment: <CalendarTodayIcon className={classes.icon} />
      }}
      TextFieldComponent={(textFieldProps: Omit<TextFieldProps, 'size'>) => (
        <TextField
          InputLabelProps={{
            classes: {
              root: classes.required
            }
          }}
          {...textFieldProps}
          {...FieldProps}
        />
      )}
      clearLabel="Очистить"
      cancelLabel="Отмена"
    />
  );
};
