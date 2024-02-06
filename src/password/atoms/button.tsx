import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  handleClose: () => void;
  children: React.ReactNode;
};

type passProps = {
  handleOpen: () => void;
  children: React.ReactNode;
  passwordMatch: boolean;
};

export const ModalButton: FC<Props> = (props: Props) => {
  const { handleClose, children } = props;
  const navigate = useNavigate();
  const handleGoToPass = () => navigate('/login');

  const onClickEvent = () => {
    handleGoToPass();
    handleClose();
  };
  return (
    <Button onClick={onClickEvent} sx={{ border: '1px solid #000', color: '#000', marginTop: 2.5 }}>
      {children}
    </Button>
  );
};

export const ButtonPass: FC<passProps> = (props: passProps) => {
  const { passwordMatch, handleOpen, children} = props;

  const isEnabledButton = (passwordMatch: boolean): boolean => {
    if (passwordMatch) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Button
      type="submit"
      variant="contained"
      sx={{ marginTop: 4, marginBottom: 2, background: '#D21919', ':hover': { background: '#D21919' } }}
      fullWidth
      onClick={handleOpen}
      disabled={isEnabledButton(passwordMatch)}
    >
      {children}
    </Button>
  );
};
