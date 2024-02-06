import { FC } from 'react';
import { Modal } from '@mui/material';
import { ModalBox } from '../molecules/box';

type Props = {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
};

export const MailModal: FC<Props> = (props: Props) => {
  const { handleOpen, handleClose, open } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox handleClose={handleClose} handleOpen={handleOpen} />
    </Modal>
  );
};
