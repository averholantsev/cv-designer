import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Spacer } from 'components/Spacer';
import React, { FC } from 'react';
import { IStepHeadersType } from 'routes/CV/shared/model';

import Counter from './Counter';

export const useStyles = makeStyles(({ spacing, colors }) => ({
  hoverLink: {
    cursor: 'pointer',
    '&:hover': {
      color: colors.normalBlackberry
    }
  },
  active: {
    color: colors.normalBlackberry
  },
  baseHeader: {
    marginBottom: spacing(2)
  },
  subHeaderLink: {
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  subHeader: {
    marginLeft: spacing(2)
  },
  doneColor: {
    color: colors.normalApple
  }
}));

interface INavigationProps {
  headers: IStepHeadersType;
  activeStep: number;
  isClickable: boolean;
  stepStatuses: boolean[];
  setActiveStep?: (step: number) => void;
}

const Navigation: FC<INavigationProps> = ({
  headers,
  activeStep,
  isClickable,
  stepStatuses,
  setActiveStep
}) => {
  const classes = useStyles();

  return (
    <>
      <Spacer flexDirection="column" spacing={2}>
        {((Object.keys(headers) as unknown) as number[]).map((item, index) => (
          <Box key={item} display="flex">
            <Counter number={index + 1} isDone={isClickable ? undefined : stepStatuses[index]} />
            <Box display="flex" flexDirection="column" flexShrink={10}>
              <Typography
                variant="h3"
                className={clsx(
                  classes.baseHeader,
                  isClickable && classes.hoverLink,
                  index === activeStep && classes.active,
                  !isClickable && stepStatuses[index] && classes.doneColor
                )}
                onClick={() => (isClickable ? setActiveStep && setActiveStep(index) : null)}
              >
                {headers[item].baseHeader}
              </Typography>
              <Spacer flexDirection="column" spacing={2}>
                {headers[item].subHeaders?.map(subHeader => (
                  <Typography
                    key={subHeader.id}
                    variant="body1"
                    className={clsx(
                      classes.subHeader,
                      index === activeStep && classes.subHeaderLink
                    )}
                    component={index === activeStep ? 'a' : 'span'}
                    href={`#${subHeader.id}`}
                  >
                    - {subHeader.title}
                  </Typography>
                ))}
              </Spacer>
            </Box>
          </Box>
        ))}
      </Spacer>
    </>
  );
};

export default Navigation;
