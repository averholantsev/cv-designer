import { AutocompleteBase, IAutocompleteProps } from 'components';
import React, { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Optional } from 'utils/types';

type IOptionType = {
  id: string;
  name: string;
};

type IProps<T> = Optional<IAutocompleteProps<T>, 'onInputChange' | 'onItemSelected'> & {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  getElementId?: (value: T) => string | undefined;
};

const getDefaultElementId = (item: unknown) => (item as IOptionType).id;
const Autocomplete = ({
  name,
  label,
  placeholder,
  required,
  multiple,
  onInputChange,
  options,
  getElementId = getDefaultElementId,
  getOptionLabel,
  onItemSelected,
  ...autocompleteProps
}: IProps<IOptionType>): JSX.Element => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const {
    field: { ref, onChange, ...inputProps },
    fieldState: { invalid }
  } = useController({
    name,
    control,
    defaultValue: getDefaultValue(autocompleteProps.defaultValue)
  });

  function getDefaultValue(option: IOptionType | IOptionType[] | null | undefined) {
    if (option && !(option as IOptionType[]).length) {
      return (option as IOptionType)?.id;
    }

    if (option && (option as IOptionType[]).length) {
      return (option as IOptionType[]).map(item => item.id);
    }

    return multiple ? [] : '';
  }

  const getOptionLabelOrDefault = (option: IOptionType): string => {
    if (getOptionLabel) {
      return getOptionLabel(option);
    } else {
      return option ? option.name : '';
    }
  };

  const onSelected = useCallback(
    (items: IOptionType | IOptionType[] | null) => {
      if (Array.isArray(items)) {
        onChange(items.map(getElementId));
      } else {
        onChange(items ? getElementId(items) : null);
      }
      onItemSelected?.((items as unknown) as (IOptionType & IOptionType[]) | null);
    },

    [getElementId, onItemSelected, onChange]
  );

  const findSelectedItem = (id: string | string[]): IOptionType | IOptionType[] | null => {
    let result;

    if (Array.isArray(id)) {
      result = [];
      id.forEach(item => {
        result.push(options?.find(option => option.id === item));
      });
    } else {
      result = options?.find(option => option.id === id);
    }

    if (result) {
      return result;
    } else {
      return null;
    }
  };

  return (
    <AutocompleteBase
      {...autocompleteProps}
      InputProps={{
        ...inputProps,
        inputRef: ref,
        label,
        required,
        placeholder,
        fullWidth: true,
        error: invalid,
        helperText: errors[name]?.message,
        ...autocompleteProps.InputProps
      }}
      options={options}
      multiple={multiple}
      onInputChange={onInputChange}
      getOptionLabel={getOptionLabelOrDefault}
      onItemSelected={onSelected}
      value={findSelectedItem(inputProps.value)}
      {...(multiple
        ? { getOptionSelected: (option: IOptionType, value: IOptionType) => value.id === option.id }
        : null)}
    />
  );
};

export default Autocomplete;
