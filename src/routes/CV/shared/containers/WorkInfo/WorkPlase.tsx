import { Button, Divider, Grid, makeStyles } from '@material-ui/core';
import { Spacer } from 'components';
import { Autocomplete, Select, TextField } from 'form';
import { WorkPlace } from 'models/types/cv';
import React, { ReactElement } from 'react';
import { useFieldArray } from 'react-hook-form';

import { monthList, regionTemp } from './tempValues';

const useStyles = makeStyles(({ spacing, typography, colors }) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  monthStart: {
    flexGrow: 2,
    marginRight: spacing(1)
  },
  yearStart: {
    width: 80
  },
  errorMessage: {
    flexBasis: '100%',
    ...typography.caption,
    color: colors.darkRed
  }
}));

export const WorkPlase = (): ReactElement => {
  const classes = useStyles();

  const { fields, append, remove } = useFieldArray({
    name: 'workPlace'
  });

  const appendEducation = () => {
    append({});
  };

  const removeEducation = () => {
    remove(fields.length - 1);
  };

  return (
    <>
      {((fields as unknown) as WorkPlace[]).map((field, index) => {
        return (
          <Grid key={field.id} container item spacing={3}>
            <Grid item xs={12} sm={6} className={classes.container}>
              <Select
                name={`workPlace.${index}.monthStart`}
                label="Начало работы"
                options={monthList}
                className={classes.monthStart}
                defaultValue={field.monthStart}
              />
              <TextField
                name={`workPlace.${index}.yearStart`}
                placeholder="Год"
                className={classes.yearStart}
                defaultValue={field.yearStart}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.container}>
              <Select
                name={`workPlace.${index}.monthEnd`}
                label="Окончание работы"
                options={monthList}
                className={classes.monthStart}
                defaultValue={field.monthEnd}
              />
              <TextField
                name={`workPlace.${index}.yearEnd`}
                placeholder="Год"
                className={classes.yearStart}
                defaultValue={field.yearEnd}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name={`workPlace.${index}.company`}
                label="Организация"
                defaultValue={field.company}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name={`workPlace.${index}.site`}
                label="Сайт"
                defaultValue={field.site}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={regionTemp}
                name={`workPlace.${index}.regionId`}
                label="Регион"
                defaultValue={regionTemp.find(item => item.id === field.regionId)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={`workPlace.${index}.position`}
                label="Должность"
                defaultValue={field.position}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={`workPlace.${index}.positionDuties`}
                label="Должностные обязанности"
                defaultValue={field.positionDuties}
                fullWidth
                multiline
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
