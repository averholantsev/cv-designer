import { CircularProgress, InputAdornment, TextField, TextFieldProps } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams
} from '@material-ui/lab';
import React, { ChangeEvent } from 'react';

import { useStyles } from './styles';

export type IAutocompleteProps<T> = Omit<
  AutocompleteProps<T, boolean, boolean, false>,
  'renderInput' | 'onChange' | 'onInputChange' | 'size' | 'options'
> & {
  options: T[] | null;
  /**
   * Обрабатывает события изменения текста в строке поиска
   * @param event
   */
  InputProps?: TextFieldProps;
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onItemSelected?: (value: T | null) => void;
  withoutSearchIcon?: boolean;
};

export const AutocompleteBase = <T,>({
  options,
  InputProps,
  onInputChange = () => null,
  onItemSelected = undefined,
  withoutSearchIcon,
  ...props
}: IAutocompleteProps<T>): JSX.Element => {
  const classes = useStyles();
  const normalOptions = options || [];

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (_: ChangeEvent<{}>, value: T | T[] | null) =>
    onItemSelected?.((value as unknown) as (T & T[]) | null);

  const renderInput = (params: Omit<AutocompleteRenderInputParams, 'size'>) => {
    (params.inputProps as React.HTMLAttributes<HTMLInputElement>).className = classes.textField;
    return (
      <TextField
        {...params}
        {...InputProps}
        onChange={onInputChange}
        variant="outlined"
        InputLabelProps={{
          classes: {
            root: classes.required
          }
        }}
        InputProps={{
          ...params.InputProps,
          startAdornment: !withoutSearchIcon ? (
            <>
              <SearchIcon className={classes.icon} /> {params.InputProps.startAdornment}
            </>
          ) : (
            params.InputProps.startAdornment
          ),
          endAdornment: (
            <>
              {props.loading && (
                <InputAdornment position="end">
                  <CircularProgress size={16} />
                </InputAdornment>
              )}
              {params.InputProps.endAdornment}
            </>
          )
        }}
      />
    );
  };

  return (
    <MuiAutocomplete
      classes={{
        inputRoot: classes.root,
        listbox: classes.dropdown,
        paper: classes.dropdownContainer,
        option: classes.dropdownElement,
        endAdornment: classes.end
      }}
      options={normalOptions}
      noOptionsText="Нет подходящих вариантов"
      onChange={handleChange}
      loadingText="Поиск..."
      renderInput={renderInput}
      {...props}
    />
  );
};
