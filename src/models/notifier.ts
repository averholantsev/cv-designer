import { createModel } from '@rematch/core';
import { INotification, NotificationTypes } from 'config/notifications';

import { IRootModel } from '.';

interface IState {
  notifications: INotification[];
}

const initialState: IState = {
  notifications: []
};

export const notifier = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    enqueueSnackbar: (state, notification: Omit<INotification, 'dismissed'>): IState => {
      return {
        notifications: [
          ...state.notifications,
          {
            ...notification,
            dismissed: false
          }
        ]
      };
    },
    closeSnackbar(state, key: NotificationTypes): IState {
      return {
        notifications: state.notifications.map(notification =>
          notification.key === key ? { ...notification, dismissed: true } : notification
        )
      };
    },
    removeSnackbar(state, key: NotificationTypes): IState {
      return {
        notifications: state.notifications.filter(notification => notification.key !== key)
      };
    }
  }
});
