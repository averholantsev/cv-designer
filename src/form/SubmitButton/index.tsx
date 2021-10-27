import { Button, ButtonProps } from '@material-ui/core';
import React, { FC, memo, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { FORM_ERROR } from '../config';

interface IProps extends ButtonProps {
  icon?: ReactNode;
  loading?: boolean;
}

const SubmitButton: FC<IProps> = ({ icon, disabled, loading, children, onClick, ...props }) => {
  const { formState, clearErrors } = useFormContext();
  const { isSubmitting } = formState;

  const checkLoading = loading || isSubmitting;
  let checkDisabled;
  if (disabled === undefined) {
    const checkIsValid = !formState.isValid;
    checkDisabled = checkLoading || checkIsValid;
  } else {
    checkDisabled = disabled;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick?.(e);
    clearErrors(FORM_ERROR);
  };

  return (
    <Button
      type="submit"
      onClick={handleClick}
      disabled={checkDisabled}
      {...props}
      startIcon={!checkLoading && icon ? icon : undefined}
    >
      {children}
    </Button>
  );
};

export default memo(SubmitButton);
