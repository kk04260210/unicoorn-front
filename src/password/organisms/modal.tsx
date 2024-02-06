import { Modal } from '@mui/material';
import { FC } from 'react';
import { BoxModal } from '../molecules/box';

type Props = {
  handleClose: () => void;
  open: boolean;
};


export const ModalPass: FC<Props> = (props: Props) => {
  const { handleClose, open } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxModal handleClose={handleClose} >パスワードを変更しました</BoxModal>
    </Modal>
  );
};
