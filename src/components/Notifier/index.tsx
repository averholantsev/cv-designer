import { NotificationTypes } from 'config/notifications';
import { useSnackbar } from 'notistack';
import { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IDispatch, IRootState } from 'store';

type IProps = ConnectedProps<typeof withConnect>;

let displayed: Array<NotificationTypes | string> = [];

const Notifier: FC<IProps> = ({ notifications, removeSnackbar }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: NotificationTypes) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: NotificationTypes) => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (_, myKey) => {
          // remove this snackbar from redux store
          removeSnackbar(myKey as NotificationTypes);
          removeDisplayed(myKey as NotificationTypes);
        }
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key as NotificationTypes);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, removeSnackbar]);

  return null;
};

const mapState = (s: IRootState) => ({
  notifications: s.notifier.notifications
});

const mapDispatch = (d: IDispatch) => ({
  removeSnackbar: d.notifier.removeSnackbar
});

const withConnect = connect(mapState, mapDispatch);

export default withConnect(Notifier);
