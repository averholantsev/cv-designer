import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ colors, spacing, typography, customShadows }) => ({
  card: {
    width: 275,
    height: 275,
    cursor: 'pointer',
    borderRadius: 16,
    boxShadow: customShadows.card,

    '&:hover': {
      boxShadow: customShadows.cardHover
    }
  },
  headerTitle: {
    ...typography.h6
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  img: {
    height: 144,
    objectFit: 'cover',
    marginBottom: spacing(1)
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&:hover $addIcon': {
      fill: colors.greyRaven
    }
  },
  addIcon: {
    fontSize: 46,
    fill: colors.greyHeather
  }
}));
