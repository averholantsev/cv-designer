import { routerConfig } from 'config/router';
import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { CV, CVCreate, CVEdit, CVView, NotFound } from '.';

const Root: FC = () => {
  return (
    <Switch>
      <Redirect exact from={routerConfig.HOME.path()} to={routerConfig.CV.path()} />
      <Route {...routerConfig.CV.routeProps}>
        <CV />
      </Route>
      <Route {...routerConfig.CV_CREATE.routeProps}>
        <CVCreate />
      </Route>
      <Route {...routerConfig.CV_VIEW.routeProps}>
        <CVView />
      </Route>
      <Route {...routerConfig.CV_EDIT.routeProps}>
        <CVEdit />
      </Route>
      <Route {...routerConfig.NOT_FOUND.routeProps}>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Root;
