import { Button, Grid, Typography } from '@material-ui/core';
import { Spacer } from 'components';
import { SubmitButton } from 'form';
import { IAvatarAdd } from 'models/types/cv';
import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { IDispatch, IRootState } from 'store';
import { IFormData } from 'utils/types';

import { AvatarLoader } from './AvatarLoader';

type IConnectedProps = ConnectedProps<typeof withConnect>;

const AvatarAddContainer: FC<IFormData & IConnectedProps> = ({
  stepHeaders,
  onSubmit,
  onBack,
  avatarAddData,
  setCvState
}) => {
  const { baseHeader } = stepHeaders;

  const methods = useForm<IAvatarAdd>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: avatarAddData
  });

  const submitForm = (values: IAvatarAdd) => {
    onSubmit();
    setCvState({ avatarAddData: values });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitForm)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2">{baseHeader}</Typography>
          </Grid>

          <AvatarLoader />

          <Grid item xs={12}>
            <Spacer spacing={3} fullWidth justifyContent="flex-end">
              <Button color="secondary" onClick={onBack}>
                Назад
              </Button>
              <SubmitButton>Сохранить</SubmitButton>
            </Spacer>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

const mapState = (s: IRootState) => ({
  avatarAddData: s.cvWizard.avatarAddData
});

const mapDispatch = (d: IDispatch) => ({
  setCvState: d.cvWizard.setState
});

const withConnect = connect(mapState, mapDispatch);

export const AvatarAdd = withConnect(AvatarAddContainer);
