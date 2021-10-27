import { makeStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import clsx from 'clsx';
import React, { FC } from 'react';

interface ICounterProps {
  number: number;
  isDone?: boolean;
}

const useStyles = makeStyles(({ spacing, colors, typography }) => ({
  root: {
    width: 35,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing(2),
    border: `2px solid ${colors.lightBlack}`,
    borderRadius: '50%',
    ...typography.subtitle1
  },
  done: {
    color: colors.normalApple,
    borderColor: colors.normalApple
  }
}));

const Counter: FC<ICounterProps> = ({ number, isDone }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, isDone && classes.done)}>
      {isDone ? <DoneIcon /> : number}
    </div>
  );
};

export default Counter;
