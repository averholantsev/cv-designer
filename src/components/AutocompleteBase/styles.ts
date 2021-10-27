import { fade, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, colors }) => ({
  root: {
    paddingTop: `${spacing(1)}px !important`,
    paddingBottom: `${spacing(1)}px !important`
  },
  textField: {
    flex: 1,
    height: '0.2em'
  },
  dropdownContainer: {
    margin: 0
  },
  dropdown: {
    padding: 0
  },
  dropdownElement: {
    padding: spacing(1.25, 1.5)
  },
  backBtn: {
    padding: 4
  },
  icon: {
    margin: spacing(0, 1.5),
    fontSize: 21,
    fill: fade(colors.black, 0.54)
  },
  required: {
    '& > span': {
      color: colors.darkRed
    }
  },
  end: {
    top: 'auto',
    right: 8
  }
}));
