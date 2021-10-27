import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography } from '@material-ui/core';
import { FormBlock, Spacer } from 'components';
import { SubmitButton } from 'form';
import { IWorkInfo } from 'models/types/cv';
import React, { FC, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { IDispatch, IRootState } from 'store';
import { IFormData } from 'utils/types';

import { AboutSelf } from './AboutSelf';
import { KeySkills } from './KeySkills';
import { schema } from './schema';
import { keySkillsTemp, KeySkillsType } from './tempValues';
import { WorkPlase } from './WorkPlase';

type IConnectedProps = ConnectedProps<typeof withConnect>;

const WorkInfoContainer: FC<IFormData & IConnectedProps> = ({
  workInfoData,
  stepHeaders,
  onSubmit,
  onBack,
  setCvState,
  stepStatuses,
  keySkillsList
}) => {
  const { baseHeader, subHeaders } = stepHeaders;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [workPlase, keySkills, aboutSelf] = subHeaders!;

  const methods = useForm<IWorkInfo>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: workInfoData
  });

  useEffect(() => {
    if (methods.formState.isDirty) {
      setCvState({
        onConfirm: () => setCvState({ workInfoData: methods.getValues() }),
        isDirty: true
      });
    }

    return () => {
      setCvState({ onConfirm: undefined, isDirty: undefined });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState.isDirty, setCvState]);

  const setKeySkillsList = useCallback(
    (list: KeySkillsType) => {
      setCvState({ keySkillsList: list });
    },
    [setCvState]
  );

  useEffect(() => {
    if (keySkillsList.length === 0) {
      setKeySkillsList(keySkillsTemp);
    }
  }, [keySkillsList, setKeySkillsList]);

  const submitForm = (values: IWorkInfo) => {
    onSubmit();
    setCvState({ workInfoData: values, stepStatuses: [...stepStatuses, true] });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitForm)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2">{baseHeader}</Typography>
          </Grid>

          <FormBlock title={workPlase}>
            <WorkPlase />
          </FormBlock>

          <FormBlock title={keySkills}>
            <KeySkills keySkills={{ keySkillsList, setKeySkillsList }} />
          </FormBlock>

          <FormBlock title={aboutSelf}>
            <AboutSelf />
          </FormBlock>

          <Grid item xs={12}>
            <Spacer spacing={3} fullWidth justifyContent="flex-end">
              <Button color="secondary" onClick={onBack}>
                Назад
              </Button>
              <SubmitButton>Далее</SubmitButton>
            </Spacer>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

const mapState = (s: IRootState) => ({
  workInfoData: s.cvWizard.workInfoData,
  stepStatuses: s.cvWizard.stepStatuses,
  keySkillsList: s.cvWizard.keySkillsList
});

const mapDispatch = (d: IDispatch) => ({
  setCvState: d.cvWizard.setState
});

const withConnect = connect(mapState, mapDispatch);

export const WorkInfo = withConnect(WorkInfoContainer);
