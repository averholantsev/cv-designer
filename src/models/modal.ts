import { createModel } from '@rematch/core';
import { IModalProps } from 'components/SubmitModal';

import { IRootModel } from '.';
import { resetState, setState } from './utils';

interface IState {
  isOpen: boolean;
  modalProps?: IModalProps;
}

const initialState: IState = { isOpen: false };

export const modal = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setState,
    resetState: resetState(initialState)
  },
  // ToDo: Разобраться с типизацией и диспатча (бага в либе?)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effects: (d: any) => ({
    toggleModal: () => {
      d.modal.setState({ isOpen: false });
    },
    confirmModal: (modalProps: IModalProps) => {
      d.modal.setState({ isOpen: true, modalProps });
    }
  })
});
