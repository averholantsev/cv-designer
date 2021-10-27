import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navigation from 'components/Navigation';
import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IDispatch, IRootState } from 'store';

import { stepHeaders } from '../CVWizard/config';

type IConnectedProps = ConnectedProps<typeof withConnect>;
interface INavigationWrapperProps extends IConnectedProps {
  activeStep: number;
  isMobile: boolean;
  isClickable: boolean;
  setActiveStep?: (step: number) => void;
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(4, 3)
  },
  accordion: {
    boxShadow: 'none'
  }
}));

const NavigationWrapper: FC<INavigationWrapperProps> = ({
  activeStep,
  isMobile,
  isClickable,
  setActiveStep,
  confirmModal,
  isDirty,
  stepStatuses,
  onConfirm
}) => {
  const classes = useStyles();

  const openModal = (step: number) => {
    if (setActiveStep) {
      confirmModal({
        title: 'Имеются несохраненные данные, сохранить?',
        onSubmit: () => {
          setActiveStep(step);
          onConfirm && onConfirm();
        }
      });
    }
  };

  const navigation = (
    <Navigation
      headers={stepHeaders}
      activeStep={activeStep}
      stepStatuses={stepStatuses}
      setActiveStep={isDirty ? openModal : setActiveStep}
      isClickable={isClickable}
    />
  );

  return isMobile ? (
    <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body1">Навигация по форме</Typography>
      </AccordionSummary>
      <AccordionDetails>{navigation}</AccordionDetails>
    </Accordion>
  ) : (
    <Paper elevation={0} className={classes.root}>
      {navigation}
    </Paper>
  );
};

const mapState = (s: IRootState) => ({
  isDirty: s.cvWizard.isDirty,
  onConfirm: s.cvWizard.onConfirm,
  stepStatuses: s.cvWizard.stepStatuses
});

const mapDispatch = (d: IDispatch) => ({
  confirmModal: d.modal.confirmModal
});

const withConnect = connect(mapState, mapDispatch);

export default withConnect(NavigationWrapper);
