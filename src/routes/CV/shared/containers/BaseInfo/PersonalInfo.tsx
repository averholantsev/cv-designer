import { Grid } from '@material-ui/core';
import { Autocomplete, DatePicker, RadioGroup } from 'form';
import React, { ReactElement, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { livingCityTemp } from './tempValues';

export const PersonalInfo = (): ReactElement => {
  const { setValue } = useFormContext();
  const relocation = useWatch({
    name: 'relocation'
  });

  useEffect(() => {
    if (relocation === 'impossible' || relocation === null) {
      setValue('movingCityId', null);
    }
  }, [relocation, setValue]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <DatePicker
          name="birthDate"
          label="Год рождения"
          required
          views={['year', 'month', 'date']}
          openTo="year"
          disableFuture
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <RadioGroup
          name="gender"
          label="Пол"
          radioList={[
            { value: 'male', label: 'Мужской' },
            { value: 'female', label: 'Женский' }
          ]}
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          row
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <RadioGroup
          name="businessTripReady"
          label="Готовность к командировкам"
          radioList={[
            { value: 'never', label: 'Никогда' },
            { value: 'ready', label: 'Готов' },
            { value: 'sometimes', label: 'Иногда' }
          ]}
          formControlProps={{
            fullWidth: true
          }}
          row
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <RadioGroup
          name="relocation"
          label="Переезд"
          radioList={[
            { value: 'impossible', label: 'Невозможен' },
            { value: 'possible', label: 'Возможен' },
            { value: 'desirable', label: 'Желателен' }
          ]}
          formControlProps={{
            fullWidth: true
          }}
          row
        />
      </Grid>

      {relocation && relocation !== 'impossible' && (
        <Grid item xs={12}>
          <Autocomplete
            options={livingCityTemp}
            name="movingCityId"
            label="Город проживания"
            fullWidth
          />
        </Grid>
      )}
    </>
  );
};
