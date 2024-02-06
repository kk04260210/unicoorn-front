import { ModalButton } from '../atoms/button';
import { FC } from 'react';
import { BaseLabel } from '../atoms/label';
import { Box } from '@mui/material';

type Props = {
  handleOpen: () => void;
  handleClose: () => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  height: 70,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

export const ModalBox: FC<Props> = (props: Props) => {
  const { handleOpen, handleClose } = props;
  return (
    <Box sx={style}>
      <BaseLabel id="modal-modal-title" variant="h6" component="h2">
        メールを送信しました
      </BaseLabel>

      <ModalButton handleOpen={handleOpen} handleClose={handleClose}>
        OK
      </ModalButton>
    </Box>
  );
};
