import { Grid, makeStyles, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Autocomplete } from 'form';
import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { KeySkillsType } from './tempValues';

interface IKeySkillsProps {
  keySkills: {
    keySkillsList: KeySkillsType;
    setKeySkillsList: (value: KeySkillsType) => void;
  };
}

const useStyles = makeStyles(({ breakpoints, spacing, colors }) => ({
  skillsInput: {
    marginTop: spacing(1),
    width: '50%',

    [breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  addIcon: {
    cursor: 'pointer',
    color: colors.darkRed,

    '&:hover': {
      filter: 'brightness(0.9)'
    }
  }
}));

export const KeySkills: FC<IKeySkillsProps> = ({
  keySkills: { keySkillsList, setKeySkillsList }
}) => {
  const classes = useStyles();

  const { setValue, getValues } = useFormContext();

  const addKeySkills = () => {
    if (customSkill !== '') {
      const newValue = { id: (Math.random() * 1000).toString(), name: customSkill };
      const newKeySkills = [...keySkillsList, newValue];
      setKeySkillsList(newKeySkills);

      const newValuesKeySkills = [...getValues('keySkills'), newValue.id];
      setValue('keySkills', newValuesKeySkills);

      setCustomSkill('');
    }
  };
  const enterPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addKeySkills();
    }
  };

  const [customSkill, setCustomSkill] = useState('');
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSkill(event.target.value);
  };

  return (
    <>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          options={keySkillsList}
          name="keySkills"
          label="Ключевые навыки"
          withoutSearchIcon
        />

        <TextField
          className={classes.skillsInput}
          label="Добавить навык"
          value={customSkill}
          onChange={onChangeHandler}
          onKeyDown={enterPressHandler}
          InputProps={{
            endAdornment: <AddIcon className={classes.addIcon} onClick={addKeySkills} />
          }}
        />
      </Grid>
    </>
  );
};
