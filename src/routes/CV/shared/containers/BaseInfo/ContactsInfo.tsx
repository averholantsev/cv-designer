import { Grid } from '@material-ui/core';
import { Autocomplete, TextField } from 'form';
import React, { ReactElement } from 'react';

import { livingCityTemp } from './tempValues';

export const ContactsInfo = (): ReactElement => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField name="lastName" label="Фамилия" required fullWidth />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField name="firstName" label="Имя" required fullWidth />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          options={livingCityTemp}
          name="livingCityId"
          label="Город проживания"
          required
          fullWidth
        />
      </Grid>
    </>
  );
};
