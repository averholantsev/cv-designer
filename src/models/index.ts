import { Models } from '@rematch/core';

import { cv } from './cv';
import { cvWizard } from './cvWizard';
import { modal } from './modal';
import { notifier } from './notifier';

export interface IRootModel extends Models<IRootModel> {
  cv: typeof cv;
  cvWizard: typeof cvWizard;
  notifier: typeof notifier;
  modal: typeof modal;
}

const rootModel: IRootModel = {
  cv,
  cvWizard,
  notifier,
  modal
};

export default rootModel;
