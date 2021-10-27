import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import {
  APP_MAX_WIDTH,
  APP_PADDING_BOTTOM,
  APP_PADDING_LR_MD,
  APP_PADDING_LR_SM,
  APP_PADDING_LR_XS,
  APP_PADDING_TOP_SM,
  APP_PADDING_TOP_XS
} from 'config/common';
import { IRouterConfigGenerator } from 'config/router/RouterConfigGenerator';
import { FC } from 'react';
import { useParams } from 'react-router';

const useStyles = makeStyles<Theme>(({ spacing, breakpoints, typography }) => ({
  root: {
    maxWidth: APP_MAX_WIDTH,
    margin: '0 auto',
    flex: 1,
    padding: spacing(APP_PADDING_TOP_SM, APP_PADDING_LR_MD, APP_PADDING_BOTTOM),

    [breakpoints.down('sm')]: {
      padding: spacing(APP_PADDING_TOP_SM, APP_PADDING_LR_SM, APP_PADDING_BOTTOM)
    },

    [breakpoints.down('xs')]: {
      padding: spacing(APP_PADDING_TOP_XS, APP_PADDING_LR_XS, APP_PADDING_BOTTOM)
    }
  },
  header: {
    margin: spacing(3, 0),

    [breakpoints.down('xs')]: {
      margin: spacing(3, 0)
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',

    [breakpoints.down('xs')]: {
      ...typography.h2,
      fontWeight: 700
    }
  }
}));

interface IProps {
  routerConfig: IRouterConfigGenerator;
  headerExtra?: JSX.Element;
  noHeader?: boolean;
  noBreadCrumbs?: boolean;
  noHorizontalPadding?: boolean;
  off?: boolean;
}

const Wrapper: FC<IProps> = ({ routerConfig, headerExtra, noHeader, off, children }) => {
  const classes = useStyles();
  const routerParams = useParams();
  routerConfig.extra = { pathProps: routerParams };

  if (off) {
    return <>{children}</>;
  }

  let header: JSX.Element | undefined;
  if (!noHeader) {
    header = (
      <Grid container className={classes.header}>
        <Typography variant="h1" className={classes.title}>
          {routerConfig.name}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" className={classes.root}>
      {headerExtra}
      {header}
      {children}
    </Grid>
  );
};

export default Wrapper;
