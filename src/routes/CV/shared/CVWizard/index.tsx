import { Box, CircularProgress } from '@material-ui/core';
import { routerConfig } from 'config/router';
import { storage } from 'firebaseApp';
import { ICVData } from 'models/types/cv';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CVService } from 'services';
import { IDispatch, IRootState } from 'store';

import { AvatarAdd, BaseInfo, EducationInfo, WorkInfo } from '../containers';
import { stepHeaders } from './config';

type IConnectedProps = ConnectedProps<typeof withConnect>;

interface ICVWizardProps extends IConnectedProps {
  activeStep: number;
  id?: string;
  setActiveStep?: (step: number) => void;
}

const CVWizard = ({
  activeStep,
  id,
  setActiveStep,
  selectedCV,
  loading,
  getCVById,
  resetSelectedCV,
  isDirty,
  setCVWizardState,
  baseInfoData,
  educationInfoData,
  workInfoData,
  avatarAddData,
  resetCVWizard
}: ICVWizardProps): JSX.Element => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (id) {
      getCVById(id);
    }

    return () => {
      resetSelectedCV();
    };
  }, [id, getCVById, resetSelectedCV]);

  useEffect(() => {
    if (selectedCV) {
      const { workplace, education, base, avatar } = selectedCV;

      setCVWizardState({
        baseInfoData: base,
        educationInfoData: education,
        workInfoData: workplace,
        avatarAddData: avatar
      });
    }

    return () => {
      resetCVWizard();
    };
  }, [selectedCV, setCVWizardState, resetCVWizard]);

  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = function () {
        return 'Данные не сохранены. Вы уверены что хотите закрыть страницу?';
      };
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty]);

  const uploadFileHandler = (file: File): Promise<string> => {
    const uploadTask = storage.ref(`images/${file.name}`).put(file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        // eslint-disable-next-line
        snapshot => {},
        err => {
          console.error(err);
          enqueueSnackbar('Произошла ошибка сохранения изображения', { variant: 'error' });
          reject(err);
        },
        () => {
          storage
            .ref('images')
            .child(file.name)
            .getDownloadURL()
            .then(url => {
              setCVWizardState({ avatarAddData: { ...avatarAddData, url } });
              enqueueSnackbar('Изображение успешно загружено', { variant: 'success' });
              resolve(url);
            });
        }
      );
    });
  };

  const saveCVHandler = async () => {
    let url: string | undefined = avatarAddData?.url;

    if (avatarAddData && avatarAddData.attachmentData) {
      url = await uploadFileHandler(avatarAddData.attachmentData);
    }

    if (baseInfoData && educationInfoData && workInfoData) {
      const data: ICVData = {
        base: baseInfoData,
        education: educationInfoData,
        workplace: workInfoData,
        avatar: { url: url },
        additional: {
          createDate: +moment()
        }
      };

      setActiveStep
        ? id &&
          CVService.patchCV(id, data)
            .then(() => {
              enqueueSnackbar('Данные успешно сохранены', { variant: 'success' });
              setTimeout(() => history.push(routerConfig.CV_VIEW.path({ id })), 1000);
            })
            .catch(err => {
              console.error(err);
              enqueueSnackbar('Произошла ошибка сохранения данных', { variant: 'error' });
            })
        : CVService.postCV(data)
            .then(() => {
              enqueueSnackbar('Данные успешно сохранены', { variant: 'success' });
              setTimeout(() => history.push(routerConfig.CV.path()), 1000);
            })
            .catch(err => {
              console.error(err);
              enqueueSnackbar('Произошла ошибка сохранения данных', { variant: 'error' });
            });
    }
  };

  const onSubmit = () => {
    if (activeStep === formWizard.length - 1) {
      saveCVHandler();
    } else {
      setActiveStep
        ? setActiveStep(activeStep + 1)
        : history.push(routerConfig.CV_CREATE.path({ id: (activeStep + 2).toString() }));
    }
  };

  const onBack = () => {
    if (activeStep === 0) {
      id ? history.push(routerConfig.CV_VIEW.path({ id })) : history.push(routerConfig.CV.path());
    } else {
      setActiveStep
        ? setActiveStep(activeStep - 1)
        : history.push(routerConfig.CV_CREATE.path({ id: activeStep.toString() }));
    }
  };

  const formWizard = [
    <BaseInfo key={0} stepHeaders={stepHeaders.baseInfo} onSubmit={onSubmit} onBack={onBack} />,
    <EducationInfo
      key={1}
      stepHeaders={stepHeaders.educationInfo}
      onSubmit={onSubmit}
      onBack={onBack}
    />,
    <WorkInfo key={2} stepHeaders={stepHeaders.workInfo} onSubmit={onSubmit} onBack={onBack} />,
    <AvatarAdd key={3} stepHeaders={stepHeaders.avatarAdd} onSubmit={onSubmit} onBack={onBack} />
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return formWizard[activeStep];
};

const mapState = (s: IRootState) => ({
  selectedCV: s.cv.selectedCV,
  loading: s.loading.effects.cv.getCVById,
  isDirty: s.cvWizard.isDirty,
  baseInfoData: s.cvWizard.baseInfoData,
  educationInfoData: s.cvWizard.educationInfoData,
  workInfoData: s.cvWizard.workInfoData,
  avatarAddData: s.cvWizard.avatarAddData
});

const mapDispatch = (d: IDispatch) => ({
  getCVById: d.cv.getCVById,
  resetSelectedCV: d.cv.resetState,
  setCVWizardState: d.cvWizard.setState,
  resetCVWizard: d.cvWizard.resetState
});

const withConnect = connect(mapState, mapDispatch);

export default withConnect(CVWizard);
