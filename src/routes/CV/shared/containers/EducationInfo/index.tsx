import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography } from '@material-ui/core';
import { FormBlock, Spacer } from 'components';
import { SubmitButton } from 'form';
import { IEducationInfo } from 'models/types/cv';
import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { IDispatch, IRootState } from 'store';
import { IFormData } from 'utils/types';

import { LanguageInfo } from './LanguageInfo';
import { ProfessionInfo } from './ProfessionInfo';
import { schema } from './schema';
import { SchoolInfo } from './SchoolInfo';

type IConnectedProps = ConnectedProps<typeof withConnect>;

const EducationInfoContainer: FC<IFormData & IConnectedProps> = ({
  educationInfoData,
  stepHeaders,
  onSubmit,
  onBack,
  setCvState,
  stepStatuses
}) => {
  const { baseHeader, subHeaders } = stepHeaders;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [profession, education, language] = subHeaders!;

  const methods = useForm<IEducationInfo>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: educationInfoData
  });

  useEffect(() => {
    if (methods.formState.isDirty) {
      setCvState({
        onConfirm: () => setCvState({ educationInfoData: methods.getValues() }),
        isDirty: true
      });
    }

    return () => {
      setCvState({ onConfirm: undefined, isDirty: undefined });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState.isDirty, setCvState]);

  const submitForm = (values: IEducationInfo) => {
    onSubmit();
    setCvState({ educationInfoData: values, stepStatuses: [...stepStatuses, true] });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitForm)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2">{baseHeader}</Typography>
          </Grid>

          <FormBlock title={profession}>
            <ProfessionInfo />
          </FormBlock>

          <FormBlock title={education}>
            <SchoolInfo />
          </FormBlock>

          <FormBlock title={language}>
            <LanguageInfo />
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
  educationInfoData: s.cvWizard.educationInfoData,
  stepStatuses: s.cvWizard.stepStatuses
});

const mapDispatch = (d: IDispatch) => ({
  setCvState: d.cvWizard.setState
});

const withConnect = connect(mapState, mapDispatch);

export const EducationInfo = withConnect(EducationInfoContainer);
