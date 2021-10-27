import { Button, Grid, Input, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { IDispatch, IRootState } from 'store';

type IConnectedProps = ConnectedProps<typeof withConnect>;
type IAvatarLoaderProps = IConnectedProps;

const useStyles = makeStyles(({ spacing }) => ({
  img: {
    width: '100%',
    maxWidth: 400
  },
  btnClear: {
    marginLeft: spacing(2)
  }
}));

const AvatarLoaderContainer: FC<IAvatarLoaderProps> = ({ avatarAddData, setCvState }) => {
  const classes = useStyles();
  const { register } = useFormContext();
  const onChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const img: File = event.target.files[0];
      const blob = new Blob([img], { type: 'image/jpeg' });
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);
      setCvState({ avatarAddData: { ...avatarAddData, attachmentData: img, url: imageUrl } });
    }
  };

  const clearHandler = () => {
    setCvState({ avatarAddData: { ...avatarAddData, attachmentData: undefined, url: '' } });
  };

  return (
    <>
      {avatarAddData?.url && (
        <Grid item xs={12}>
          <img src={avatarAddData?.url || ''} className={classes.img} />
        </Grid>
      )}
      <Grid item xs={12}>
        <label htmlFor="contained-button-file">
          <Input
            id="contained-button-file"
            {...register('attachmentData')}
            type="file"
            inputProps={{ accept: 'image/*' }}
            style={{ display: 'none' }}
            onChange={onChangeImg}
          />
          <Button variant="contained" component="span" color="primary">
            Выбрать фото
          </Button>
        </label>
        {avatarAddData?.url && (
          <Button variant="contained" onClick={clearHandler} className={classes.btnClear}>
            Очистить
          </Button>
        )}
      </Grid>
    </>
  );
};

const mapState = (s: IRootState) => ({
  avatarAddData: s.cvWizard.avatarAddData
});

const mapDispatch = (d: IDispatch) => ({
  setCvState: d.cvWizard.setState
});

const withConnect = connect(mapState, mapDispatch);

export const AvatarLoader = withConnect(AvatarLoaderContainer);
