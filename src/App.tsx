import 'moment/locale/ru';

import MomentUtils from '@date-io/moment';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ModalContextProvider from 'components/ModalContext';
import Notifier from 'components/Notifier';
import moment from 'moment';
import { SnackbarProvider } from 'notistack';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Root from 'routes/routes';
import { store } from 'store';
import theme from 'theme';

const App: FC = () => {
  const locale = 'ru';
  moment.locale(locale);

  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <BrowserRouter>
              <Root />
              <Notifier />
              <ModalContextProvider />
            </BrowserRouter>
          </SnackbarProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

export default App;
