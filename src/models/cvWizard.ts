import { createModel } from '@rematch/core';
import { KeySkillsType } from 'routes/CV/shared/containers/WorkInfo/tempValues';

import { IRootModel } from '.';
import { IAvatarAdd, IBaseInfo, IEducationInfo, IWorkInfo } from './types';
import { resetState, setState } from './utils';

interface IState {
  onConfirm?: () => void;
  isDirty?: boolean;
  stepStatuses: boolean[];
  baseInfoData?: IBaseInfo;
  educationInfoData?: IEducationInfo;
  workInfoData?: IWorkInfo;
  avatarAddData?: IAvatarAdd;
  keySkillsList: KeySkillsType;
}

const initialState: IState = {
  stepStatuses: [],
  keySkillsList: []
};

export const cvWizard = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setState,
    resetState: resetState(initialState)
  }
});
