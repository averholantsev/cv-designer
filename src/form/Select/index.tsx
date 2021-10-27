import { makeStyles, MenuItem, TextField, TextFieldProps } from '@material-ui/core';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

type IOptions = {
  id: string;
  name: string | number;
};

interface IProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  options: IOptions[];
}

const useStyles = makeStyles(({ colors }) => ({
  required: {
    '& > span': {
      color: colors.darkRed
    }
  }
}));

const Select: FC<IProps> = ({ name, options, helperText, ...props }) => {
  const classes = useStyles();
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const {
    field,
    fieldState: { invalid }
  } = useController({
    name,
    control,
    defaultValue: props.defaultValue || ''
  });

  return (
    <TextField
      select
      error={invalid}
      variant="outlined"
      helperText={errors[name]?.message || helperText}
      InputLabelProps={{
        classes: {
          root: classes.required
        }
      }}
      {...field}
      {...props}
    >
      {options.map((item, index) => (
        <MenuItem value={item.id} key={index}>
          {item.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
