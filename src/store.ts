import { init, RematchDispatch, RematchRootState, RematchStore } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';

import models, { IRootModel } from './models';

type IExtraModels = ExtraModelsFromLoading<IRootModel>;

export const storeInit = (): RematchStore<IRootModel, IExtraModels> =>
  init<IRootModel, IExtraModels>({
    plugins: [loadingPlugin()],
    models,
    redux: {
      rootReducers: {
        resetAppStore: () => undefined
      }
    }
  });

export const store = storeInit();

export type IStore = typeof store;
export type IDispatch = RematchDispatch<IRootModel>;
export type IRootState = RematchRootState<IRootModel, IExtraModels>;
