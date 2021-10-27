import RouterConfigGenerator from './RouterConfigGenerator';

export interface IIdParams {
  id: string;
}

export enum IRouterTypes {
  HOME = 'HOME',
  CV = 'CV',
  CV_CREATE = 'CV_CREATE',
  CV_VIEW = 'CV_VIEW',
  CV_EDIT = 'CV_EDIT',
  NOT_FOUND = 'NOT_FOUND'
}

export const routerConfig = {
  [IRouterTypes.HOME]: new RouterConfigGenerator({
    type: IRouterTypes.HOME,
    name: 'Главная',
    routeProps: { path: '/', exact: true }
  }),
  [IRouterTypes.CV]: new RouterConfigGenerator({
    type: IRouterTypes.CV,
    name: 'Мои резюме',
    routeProps: { path: '/cv', exact: true }
  }),
  [IRouterTypes.CV_CREATE]: new RouterConfigGenerator<IIdParams>({
    type: IRouterTypes.CV_CREATE,
    name: 'Новое резюме - Шаг',
    routeProps: { path: '/cv/create/step/:id?', exact: true }
  }),
  [IRouterTypes.CV_VIEW]: new RouterConfigGenerator<IIdParams>({
    type: IRouterTypes.CV_VIEW,
    name: 'Резюме',
    routeProps: { path: '/cv/view/:id', exact: true }
  }),
  [IRouterTypes.CV_EDIT]: new RouterConfigGenerator<IIdParams>({
    type: IRouterTypes.CV_EDIT,
    name: 'Изменение резюме',
    routeProps: { path: '/cv/edit/:id', exact: true }
  }),
  [IRouterTypes.NOT_FOUND]: new RouterConfigGenerator({
    type: IRouterTypes.NOT_FOUND,
    name: 'Страница не найдена',
    routeProps: { path: '*', disabledFlatsCheck: true }
  })
};
