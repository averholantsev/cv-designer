import { routerConfig } from 'config/router';
import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { CV, NotFound } from '.';

const Root: FC = () => {
  return (
    <Switch>
      <Redirect exact from={routerConfig.HOME.path()} to={routerConfig.CV.path()} />
      <Route {...routerConfig.CV.routeProps}>
        <CV.List />
      </Route>
      <Route {...routerConfig.CV_CREATE.routeProps}>
        <CV.Create />
      </Route>
      <Route {...routerConfig.CV_VIEW.routeProps}>
        <CV.View />
      </Route>
      <Route {...routerConfig.CV_EDIT.routeProps}>
        <CV.Edit />
      </Route>
      <Route {...routerConfig.NOT_FOUND.routeProps}>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Root;
