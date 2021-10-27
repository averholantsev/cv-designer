import { createModel } from '@rematch/core';
import { notifications } from 'config/notifications';
import { CVService } from 'services';

import { IRootModel } from '.';
import { ICVData, ICVDataMap } from './types';
import { resetState, setState } from './utils';

interface IState {
  cvsMap?: ICVDataMap;
  selectedCV?: ICVData;
}

const initialState: IState = {};

export const cv = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setState,
    resetState: resetState(initialState)
  },
  // ToDo: Разобраться с типизацией и диспатча (бага в либе?)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effects: (d: any) => ({
    async getCVs() {
      try {
        const { data } = await CVService.getAllCVs();

        d.cv.setState({
          cvsMap: data
        });
      } catch (error) {
        d.notifier.enqueueSnackbar(notifications.SERVER_ERROR);
      }
    },
    async getCVById(id: string) {
      try {
        const { data } = await CVService.getCVbyId(id);

        d.cv.setState({
          selectedCV: data
        });
      } catch (error) {
        d.notifier.enqueueSnackbar(notifications.SERVER_ERROR);
      }
    }
  })
});
