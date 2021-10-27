import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import React, { FC } from 'react';

export type IModalProps = {
  title: string;
  onSubmit: () => void;
};

export interface ISubmitModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  modalProps?: IModalProps;
}

export const SubmitModal: FC<ISubmitModalProps> = ({ isOpen, modalProps, toggleModal }) => {
  if (modalProps) {
    const { title, onSubmit } = modalProps;

    const handleSubmit = () => {
      onSubmit();
      toggleModal();
    };

    return (
      <Dialog open={isOpen} onClose={toggleModal}>
        <DialogTitle>Подтверждение операции</DialogTitle>
        <DialogContent>
          <DialogContentText>{title}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal}>Отмена</Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return null;
};
