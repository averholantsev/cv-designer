import { Button, Divider, Grid } from '@material-ui/core';
import { Spacer } from 'components';
import { Autocomplete, TextField } from 'form';
import { Education } from 'models/types/cv';
import React, { ReactElement } from 'react';
import { useFieldArray } from 'react-hook-form';

import { schoolTypesTemp } from './tempValues';

export const SchoolInfo = (): ReactElement => {
  const { fields, append, remove } = useFieldArray({
    name: 'education'
  });

  const appendEducation = () => {
    append({});
  };

  const removeEducation = () => {
    remove(fields.length - 1);
  };

  return (
    <>
      {((fields as unknown) as Education[]).map((field, index) => {
        return (
          <Grid key={field.id} container item spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                options={schoolTypesTemp}
                name={`education.${index}.schoolTypeId`}
                label="Уровень образования"
                defaultValue={schoolTypesTemp.find(item => item.id === field.schoolTypeId)}
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                name={`education.${index}.institutionName`}
                label="Учебное заведение"
                defaultValue={field.institutionName}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name={`education.${index}.finishYear`}
                label="Год окончания"
                defaultValue={field.finishYear}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={`education.${index}.faculty`}
                label="Факультет"
                defaultValue={field.faculty}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={`education.${index}.specialization`}
                label="Специальность"
                defaultValue={field.specialization}
                fullWidth
              />
            </Grid>
            {fields.length !== index + 1 && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Spacer>
          <Button onClick={appendEducation}>Добавить</Button>
          <Button onClick={removeEducation} disabled={fields.length === 1} color="secondary">
            Удалить
          </Button>
        </Spacer>
      </Grid>
    </>
  );
};
