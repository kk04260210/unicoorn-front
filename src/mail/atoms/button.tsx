import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const URL_OTP = import.meta.env.VITE_REACT_APP_URL_FRONT_OTP_CREATE;

type Props = {
  handleOpen: () => void;
  handleClose: () => void;
  mailCheck: boolean;
  children: React.ReactNode;
};

export const ModalButton: FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const handleGoToOtp = () => navigate('/otp');
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

export const MailButton: FC<Props> = (props: Props) => {
  const { handleOpen, children, mailCheck } = props;
  const onClickEvent = () => {
    handleOpen();
  };
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
      onClick={onClickEvent}
      disabled={isEnabledButton(mailCheck)}
    >
      {children}
    </Button>
  );
};
