import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography } from '@material-ui/core';
import { FormBlock, Spacer } from 'components';
import { SubmitButton } from 'form';
import { IBaseInfo } from 'models/types/cv';
import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { IDispatch, IRootState } from 'store';
import { IFormData } from 'utils/types';

import { ContactsInfo } from './ContactsInfo';
import { PersonalInfo } from './PersonalInfo';
import { schema } from './schema';

type IConnectedProps = ConnectedProps<typeof withConnect>;

const BaseInfoContainer: FC<IFormData & IConnectedProps> = ({
  baseInfoData,
  stepHeaders,
  stepStatuses,
  onSubmit,
  onBack,
  setCvState
}) => {
  const { baseHeader, subHeaders } = stepHeaders;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [contactsInfo, personalInfo] = subHeaders!;

  const methods = useForm<IBaseInfo>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: baseInfoData
  });

  useEffect(() => {
    if (methods.formState.isDirty) {
      setCvState({
        onConfirm: () => setCvState({ baseInfoData: methods.getValues() }),
        isDirty: true
      });
    }

    return () => {
      setCvState({ onConfirm: undefined, isDirty: undefined });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState.isDirty, setCvState]);

  const submitForm = (values: IBaseInfo) => {
    onSubmit();
    setCvState({ baseInfoData: values, stepStatuses: [...stepStatuses, true] });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitForm)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2">{baseHeader}</Typography>
          </Grid>

          <FormBlock title={contactsInfo}>
            <ContactsInfo />
          </FormBlock>

          <FormBlock title={personalInfo}>
            <PersonalInfo />
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
  baseInfoData: s.cvWizard.baseInfoData,
  stepStatuses: s.cvWizard.stepStatuses
});

const mapDispatch = (d: IDispatch) => ({
  setCvState: d.cvWizard.setState
});

const withConnect = connect(mapState, mapDispatch);

export const BaseInfo = withConnect(BaseInfoContainer);
