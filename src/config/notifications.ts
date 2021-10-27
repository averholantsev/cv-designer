import { OptionsObject } from 'notistack';
import { ReactNode } from 'react';

export enum NotificationTypes {
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface INotification {
  key: NotificationTypes;
  message: ReactNode;
  options?: OptionsObject;
  dismissed?: boolean;
}

export const notifications: Record<NotificationTypes, INotification> = {
  [NotificationTypes.SERVER_ERROR]: {
    key: NotificationTypes.SERVER_ERROR,
    message: 'Ошибка сервера',
    options: { variant: 'error' }
  }
};
