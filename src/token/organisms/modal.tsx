import { FC } from 'react';
import { Modal } from '@mui/material';
import { ModalTokenBox } from '../molecules/box';

type Props = {
  handleOpen: () => void;
  handleClose: () => void;
  mailCheck: boolean;
  open: boolean;
};


export const MailTokenModal: FC<Props> = (props: Props) => {
  const { handleOpen, handleClose, mailCheck, open } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalTokenBox mailCheck={mailCheck} handleClose={handleClose} handleOpen={handleOpen} />
    </Modal>
  );
};
