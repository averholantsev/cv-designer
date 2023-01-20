import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { MOMENT_DATE_SHORT } from 'config/common';
import { routerConfig } from 'config/router';
import Wrapper from 'hoc/Wrapper';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CVService } from 'services';
import { IDispatch, IRootState } from 'store';

import { useStyles } from './styles';

const CV: FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { cvsMap, loading } = useSelector((s: IRootState) => ({
    cvsMap: s.cv.cvsMap,
    loading: s.loading.effects.cv.getCVs
  }));

  const {
    cv: { getCVs, resetState: resetCVsMap }
  } = useDispatch<IDispatch>();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCVId, setSelectedCVId] = useState('');

  useEffect(() => {
    getCVs();

    return () => {
      resetCVsMap();
    };
  }, [getCVs, resetCVsMap]);

  const deleteModalOpenHandler = (id: string) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDeleteModalOpen(true);
    setSelectedCVId(id);
  };

  const deleteModalCloseHandler = () => {
    setDeleteModalOpen(false);
    setSelectedCVId('');
  };

  const deleteCV = () => {
    CVService.deleteCVbyId(selectedCVId)
      .then(() => {
        enqueueSnackbar('Резюме успешно удалено', { variant: 'success' });
        getCVs();
      })
      .catch(() => {
        enqueueSnackbar('Произошла ошибка при удалении резюме', { variant: 'error' });
      });
    deleteModalCloseHandler();
  };

  return (
    <Wrapper routerConfig={routerConfig.CV}>
      {loading ? (
        <Box mx="auto" my="auto">
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={3}>
          <Grid container spacing={6}>
            <Grid item>
              <Link to={routerConfig.CV_CREATE.path({ id: '1' })}>
                <Paper className={clsx(classes.btn, classes.card)}>
                  <AddCircleOutlineIcon fontSize="large" className={classes.addIcon} />
                </Paper>
              </Link>
            </Grid>

            {cvsMap &&
              Object.keys(cvsMap).map(item => {
                const cv = cvsMap[item];
                return (
                  <Grid item key={item}>
                    <Link to={routerConfig.CV_VIEW.path({ id: item })}>
                      <Card className={classes.card}>
                        <CardHeader
                          title={cv.education.position}
                          classes={{ title: classes.headerTitle }}
                          action={
                            <IconButton onClick={deleteModalOpenHandler(item)}>
                              <CloseIcon />
                            </IconButton>
                          }
                        />
                        <CardMedia
                          className={classes.img}
                          image={cv.avatar?.url || '/imgs/no-photo.jpg'}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography variant="caption">
                            Опубликовано:{' '}
                            {moment(cv.additional.createDate).format(MOMENT_DATE_SHORT)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
          <Dialog open={deleteModalOpen} onClose={deleteModalCloseHandler}>
            <DialogTitle>Удаление резюме</DialogTitle>
            <DialogContent>Подтвердите удаление выбранного резюме</DialogContent>
            <DialogActions>
              <Button onClick={deleteModalCloseHandler}>Отмена</Button>
              <Button onClick={deleteCV} color="primary" autoFocus>
                Удалить
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Wrapper>
  );
};

export default CV;
