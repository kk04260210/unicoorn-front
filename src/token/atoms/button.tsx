import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  handleOpen: () => void;
  handleClose: () => void;
  children: React.ReactNode;
  mailCheck: boolean;
};

export const ModalTokenButton: FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const handleGoToOtp = () => navigate('/login');
      const onClickEvent = () => {
        handleGoToOtp();
        handleClose();
      };
  const { handleClose, children } = props;
  return (
    <Button onClick={onClickEvent} sx={{ border: '1px solid #000', color: '#000', marginTop: 2.5 }}>
      {children}
    </Button>
  );
};

export const MailTokenButton: FC<Props> = (props: Props) => {
  const { handleOpen, children, mailCheck } = props;
  const isEnabledButton = (mailCheck: boolean): boolean => {
    if (mailCheck) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Button
      type="submit"
      variant="contained"
      sx={{ marginTop: 5, marginBottom: 2, background: '#D21919', ':hover': { background: '#D21919' } }}
      fullWidth
      onClick={handleOpen}
      disabled={isEnabledButton(mailCheck)}
    >
      {children}
    </Button>
  );
};
