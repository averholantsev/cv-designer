import { Grid, Typography } from '@material-ui/core';
import React, { FC, ReactNode } from 'react';
import { ISubHeader } from 'routes/CV/shared/model';

interface IFormBlockProps {
  title: ISubHeader;
  children: ReactNode;
}

export const FormBlock: FC<IFormBlockProps> = ({ title, children }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h3" id={title.id}>
          {title.title}
        </Typography>
      </Grid>
      {children}
    </>
  );
};
