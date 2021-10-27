import { fade, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ colors, spacing }) => ({
  required: {
    '& > span': {
      color: colors.darkRed
    }
  },
  icon: {
    margin: spacing(0, 1.5),
    fontSize: 24,
    fill: fade(colors.black, 0.54)
  }
}));
