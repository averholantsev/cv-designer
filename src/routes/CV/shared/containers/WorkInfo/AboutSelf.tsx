import { Grid } from '@material-ui/core';
import { CheckboxWrapper } from 'components';
import { Checkbox, CheckboxButton, TextField } from 'form';
import React, { ReactElement } from 'react';

export const AboutSelf = (): ReactElement => {
  return (
    <>
      <Grid item xs={12}>
        <TextField name="aboutSelf" label="О себе" multiline fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Checkbox name="haveCar" title="Наличие автомобиля" label="Есть личный автомобиль" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CheckboxWrapper label="Категория прав">
          <CheckboxButton label="A" name="licenseA" />
          <CheckboxButton label="B" name="licenseB" />
          <CheckboxButton label="C" name="licenseC" />
          <CheckboxButton label="D" name="licenseD" />
          <CheckboxButton label="E" name="licenseE" />
          <CheckboxButton label="BE" name="licenseBE" />
          <CheckboxButton label="CE" name="licenseCE" />
          <CheckboxButton label="DE" name="licenseDE" />
        </CheckboxWrapper>
      </Grid>
      <Grid item xs={12}>
        <TextField name="portfolio" label="Ссылка на портфолио" fullWidth />
      </Grid>
    </>
  );
};
