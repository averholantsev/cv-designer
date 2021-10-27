import { Button, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import clsx from 'clsx';
import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

type ILinkButtonProps = LinkProps & {
  className?: string;
  noIcon?: boolean;
};

const useStyles = makeStyles(() => ({
  backBtn: {
    width: 'fit-content'
  }
}));

export const LinkButton: FC<ILinkButtonProps> = ({ to, className, noIcon = false, children }) => {
  const classes = useStyles();
  return (
    <Button
      component={Link}
      to={to}
      startIcon={noIcon ? null : <ArrowBackIosIcon />}
      className={clsx(classes.backBtn, className)}
    >
      {children}
    </Button>
  );
};
