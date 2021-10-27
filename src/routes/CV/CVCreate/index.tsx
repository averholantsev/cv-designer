import { Box, Grid, makeStyles, Paper, useMediaQuery, useTheme } from '@material-ui/core';
import { LinkButton } from 'components';
import { IIdParams, routerConfig } from 'config/router';
import Wrapper from 'hoc/Wrapper';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CVWizard from '../shared/CVWizard';
import NavigationWrapper from '../shared/NavigationWrapper';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(4, 3)
  }
}));

const defaultStep = 0;

const CVCreate: FC = () => {
  const classes = useStyles();

  const { id } = useParams<IIdParams>();
  const stepNum = +id - 1;

  const config = routerConfig.CV_CREATE;
  config.extra = {
    nameSuffix: ` ${(stepNum + 1).toString()}`
  };

  const [activeStep, setActiveStep] = useState(defaultStep);

  useEffect(() => {
    setActiveStep(stepNum);

    return () => {
      setActiveStep(defaultStep);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepNum]);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Wrapper
      routerConfig={config}
      headerExtra={<LinkButton to={routerConfig.CV.path()}>Сохраненные резюме</LinkButton>}
    >
      <Box mt={3}>
        <Grid container spacing={sm ? 3 : 6}>
          <Grid item xs={12} md={4}>
            <NavigationWrapper
              isMobile={sm}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              isClickable={false}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} className={classes.root}>
              <CVWizard activeStep={activeStep} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
};
export default CVCreate;
