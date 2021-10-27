import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, colors, typography }) => ({
  label: {
    fontSize: 14,
    marginTop: spacing(-1),
    marginBottom: spacing(0.25),
    color: colors.greyRaven
  },
  required: {
    color: colors.darkRed
  },
  radioGroup: {
    minHeight: 44
  },
  radio: {
    marginLeft: 0
  },
  radioLabel: {
    ...typography.subtitle2
  }
}));
