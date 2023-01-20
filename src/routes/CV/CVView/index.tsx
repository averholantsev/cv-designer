import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { LinkButton } from 'components';
import { MOMENT_DATE_SHORT } from 'config/common';
import { businessTripReady, gender, money, relocation } from 'config/cv';
import { IIdParams, routerConfig } from 'config/router';
import Wrapper from 'hoc/Wrapper';
import moment from 'moment';
import React, { FC } from 'react';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IDispatch, IRootState } from 'store';
import { _get, getAgeString } from 'utils';

import { livingCityTemp } from '../shared/containers/BaseInfo/tempValues';
import { langugesTemp, skillsTemp } from '../shared/containers/EducationInfo/tempValues';
import { monthList, regionTemp } from '../shared/containers/WorkInfo/tempValues';

type IConnectedProps = ConnectedProps<typeof withConnect>;

const useStyles = makeStyles(() => ({
  paragraph: {
    whiteSpace: 'pre-wrap'
  }
}));

const CVView: FC<IConnectedProps> = ({ selectedCV, loading, getCVById, resetSelectedCV }) => {
  const { id } = useParams<IIdParams>();
  const classes = useStyles();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (id) {
      getCVById(id);
    }

    return () => {
      resetSelectedCV();
    };
  }, [id, getCVById, resetSelectedCV]);

  let context: JSX.Element | undefined;

  if (loading) {
    context = (
      <Box mx="auto" my="auto">
        <CircularProgress />
      </Box>
    );
  }

  if (selectedCV) {
    const { base, education, workplace, avatar, additional } = selectedCV;

    context = (
      <Grid container spacing={2}>
        <Grid item container xs={12} sm={8}>
          <Grid item xs={12}>
            <Typography variant="h2">
              {base.lastName} {base.firstName}
            </Typography>
            <Typography variant="subtitle2">
              {base.gender && gender[base.gender]}, {getAgeString(base.birthDate)}, родился{' '}
              {moment(base.birthDate).format(MOMENT_DATE_SHORT)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Город проживания: {_get(livingCityTemp, base.livingCityId)}
              {base.relocation ? ', ' + relocation[base.relocation] : ''}
            </Typography>
            <Typography variant="subtitle2">
              {base.movingCityId
                ? 'Предпочтительный город переезда: ' + _get(livingCityTemp, base.movingCityId)
                : ''}
              {base.businessTripReady ? ', ' + businessTripReady[base.businessTripReady] : ''}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Дата создания резюме: {moment(additional.createDate).format(MOMENT_DATE_SHORT)}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs={12} sm={4} justifyContent={sm ? 'center' : 'flex-end'}>
          <img
            src={avatar?.url || '/imgs/no-photo.jpg'}
            alt="Фото"
            style={{ width: 'auto', height: '200px', objectFit: 'contain' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h3">{education.position}</Typography>
            {education.salary && (
              <Typography variant="h3">
                {education.salary} {money[education.moneyTypeId]}.
              </Typography>
            )}
          </Box>
        </Grid>
        {workplace.workPlace && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">Место работы</Typography>
            {workplace.workPlace.map((item, index) => (
              <Box key={index} display="flex">
                {item.monthStart && (
                  <Box width={160}>
                    <Typography variant="subtitle2">
                      {_get(monthList, item.monthStart)} {item.yearStart} -{' '}
                      {item.monthEnd
                        ? _get(monthList, item.monthEnd) + ' ' + item.yearEnd
                        : 'По настоящее время'}
                    </Typography>
                  </Box>
                )}
                <Box display="flex" flexDirection="column" ml={2}>
                  <Typography variant="subtitle2">{item.company}</Typography>
                  {item.regionId && (
                    <Typography variant="subtitle2">{_get(regionTemp, item.regionId)}</Typography>
                  )}
                  <Typography variant="subtitle2">{item.site}</Typography>
                  <Typography variant="subtitle2">{item.position}</Typography>
                  <Typography variant="subtitle2" className={classes.paragraph}>
                    {item.positionDuties}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Ключевые навыки</Typography>
          <List disablePadding>
            {education.skills.map(item => (
              <ListItem key={item} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <ListItemIcon style={{ minWidth: 16 }}>
                  <span>•</span>
                </ListItemIcon>
                <ListItemText
                  id={item}
                  primary={<Typography variant="subtitle2">{_get(skillsTemp, item)}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        {workplace.aboutSelf && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">Обо мне</Typography>
            <Typography variant="subtitle2" className={classes.paragraph}>
              {workplace.aboutSelf}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {education.education && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">Образование</Typography>
            {education.education.map((item, index) => (
              <Box key={index} display="flex">
                <Box width={160}>
                  <Typography variant="subtitle2">{item.finishYear}</Typography>
                </Box>
                <Box display="flex" flexDirection="column" ml={2}>
                  <Typography variant="subtitle2">{item.institutionName}</Typography>
                  <Typography variant="subtitle2">{item.faculty}</Typography>
                  <Typography variant="subtitle2">{item.specialization}</Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Знание языков</Typography>
          <Typography variant="subtitle2">
            {_get(langugesTemp, education.nativeLanguageId)} - Родной
          </Typography>
          {education.foreignLanguages &&
            education.foreignLanguages.map(item => (
              <Typography variant="subtitle2" key={item}>
                {_get(langugesTemp, item)}
              </Typography>
            ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Наличие автомобиля</Typography>
          <Typography variant="subtitle2">
            Автомобиль - {workplace.haveCar ? 'Имеется' : 'Отсутствует'}
          </Typography>
          <Typography variant="subtitle2">
            Категория прав - {workplace.licenseA && 'А'} {workplace.licenseB && 'B'}{' '}
            {workplace.licenseC && 'C'} {workplace.licenseD && 'D'} {workplace.licenseE && 'E'}{' '}
            {workplace.licenseBE && 'BE'} {workplace.licenseCE && 'CE'}{' '}
            {workplace.licenseDE && 'DE'}
          </Typography>
        </Grid>
        {workplace.portfolio && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">Потфолио</Typography>
            <Typography variant="subtitle2">
              <Link href={workplace.portfolio}>Перейти по ссылке</Link>
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  } else {
    context = <Typography variant="subtitle2">Нет данных</Typography>;
  }

  return (
    <Wrapper
      routerConfig={routerConfig.CV_VIEW}
      headerExtra={
        <Box display="flex" justifyContent="space-between">
          <LinkButton to={routerConfig.CV.path()}>Сохраненные резюме</LinkButton>
          <LinkButton to={routerConfig.CV_EDIT.path({ id })} color="primary" noIcon>
            Изменить
          </LinkButton>
        </Box>
      }
    >
      {context}
    </Wrapper>
  );
};

const mapState = (s: IRootState) => ({
  selectedCV: s.cv.selectedCV,
  loading: s.loading.effects.cv.getCVById
});

const mapDispatch = (d: IDispatch) => ({
  getCVById: d.cv.getCVById,
  resetSelectedCV: d.cv.resetState
});

const withConnect = connect(mapState, mapDispatch);

export default withConnect(CVView);
