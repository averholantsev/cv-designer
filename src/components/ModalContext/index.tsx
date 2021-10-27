import { SubmitModal } from 'components/SubmitModal';
import { FC, memo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IDispatch, IRootState } from 'store';

type IConnectedProps = ConnectedProps<typeof withConnect>;

const ModalContextProvider: FC<IConnectedProps> = ({ isOpen, modalProps, toggleModal }) => {
  return <SubmitModal isOpen={isOpen} modalProps={modalProps} toggleModal={toggleModal} />;
};

const mapState = (s: IRootState) => ({
  isOpen: s.modal.isOpen,
  modalProps: s.modal.modalProps
});

const mapDispatch = (d: IDispatch) => ({
  toggleModal: d.modal.toggleModal
});

const withConnect = connect(mapState, mapDispatch);

export default withConnect(memo(ModalContextProvider));
