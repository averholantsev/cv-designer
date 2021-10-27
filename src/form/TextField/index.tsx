import { makeStyles, TextField as TextFieldMui, TextFieldProps } from '@material-ui/core';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface IProps extends Omit<TextFieldProps, 'name'> {
  name: string;
}

const useStyles = makeStyles(({ colors }) => ({
  required: {
    '& > span': {
      color: colors.darkRed
    }
  }
}));

const TextField: FC<IProps> = ({ name, helperText, defaultValue, ...props }) => {
  const classes = useStyles();
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
    defaultValue: defaultValue || ''
  });

  return (
    <TextFieldMui
      error={invalid}
      variant="outlined"
      helperText={errors[name]?.message || helperText}
      InputLabelProps={{
        classes: {
          root: classes.required
        }
      }}
      inputRef={ref}
      {...fieldProps}
      {...props}
    />
  );
};

export default TextField;
