import { Box, Grid, makeStyles, Paper, useMediaQuery, useTheme } from '@material-ui/core';
import { LinkButton } from 'components';
import { IIdParams, routerConfig } from 'config/router';
import Wrapper from 'hoc/Wrapper';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import CVWizard from '../shared/CVWizard';
import NavigationWrapper from '../shared/NavigationWrapper';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(4, 3)
  }
}));

const defaultStep = 0;

const CVEdit: FC = () => {
  const classes = useStyles();

  const { id } = useParams<IIdParams>();

  const [activeStep, setActiveStep] = useState(defaultStep);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Wrapper
      routerConfig={routerConfig.CV_EDIT}
      headerExtra={
        <Box display="flex">
          <LinkButton to={routerConfig.CV.path()}>Сохраненные резюме</LinkButton>
          <LinkButton to={routerConfig.CV_VIEW.path({ id })}>Резюме</LinkButton>
        </Box>
      }
    >
      <Box mt={3}>
        <Grid container spacing={sm ? 3 : 6}>
          <Grid item xs={12} md={4}>
            <NavigationWrapper
              isMobile={sm}
              activeStep={activeStep}
              isClickable
              setActiveStep={setActiveStep}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} className={classes.root}>
              <CVWizard activeStep={activeStep} id={id} setActiveStep={setActiveStep} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default CVEdit;
