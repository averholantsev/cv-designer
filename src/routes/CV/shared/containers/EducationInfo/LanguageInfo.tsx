import { Grid } from '@material-ui/core';
import { Autocomplete } from 'form';
import React, { ReactElement } from 'react';

import { langugesTemp } from './tempValues';

export const LanguageInfo = (): ReactElement => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Autocomplete required options={langugesTemp} name="nativeLanguageId" label="Родной язык" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          multiple
          options={langugesTemp}
          name="foreignLanguages"
          label="Иностранные языки"
          withoutSearchIcon
        />
      </Grid>
    </>
  );
};
