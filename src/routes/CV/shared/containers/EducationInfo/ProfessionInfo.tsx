import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Autocomplete, Select, TextField } from 'form';
import React, { ReactElement } from 'react';

import { moneyTypesTemp, skillsTemp } from './tempValues';

const useStyles = makeStyles(({ spacing }) => ({
  salaryInput: {
    flexGrow: 2,
    marginRight: spacing(1)
  },
  salaryMoneyType: {
    width: 100,
    marginRight: spacing(1),
    '& .MuiOutlinedInput-inputAdornedEnd': {
      paddingLeft: spacing(0.625)
    }
  },
  salaryText: {
    minWidth: 61,
    margin: spacing('auto', 0)
  }
}));

export const ProfessionInfo = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField name="position" label="Желаемая должность" required fullWidth />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box display="flex">
          <TextField className={classes.salaryInput} name="salary" label="Желаемая з/п" />
          <Select
            name="moneyTypeId"
            options={moneyTypesTemp}
            className={classes.salaryMoneyType}
            defaultValue="rub"
          />
          <Typography className={classes.salaryText} noWrap>
            на руки
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          required
          options={skillsTemp}
          name="skills"
          label="Профессиональная область"
          withoutSearchIcon
        />
      </Grid>
    </>
  );
};
