import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  otpCheck: boolean;
  buttonOnClick: () => void;
};

export const ButtonOtp: FC<Props> = (props: Props) => {
  const isEnabledButton = (otpCheck: boolean): boolean => {
    if (otpCheck) {
      return false;
    } else {
      return true;
    }
  };

  const { children, otpCheck, buttonOnClick } = props;

  return (
    <Button
      type="submit"
      variant="contained"
      sx={{ marginTop: 5, marginBottom: 2, background: '#D21919', ':hover': { background: '#D21919' } }}
      fullWidth
      onClick={buttonOnClick}
      disabled={isEnabledButton(otpCheck)}
    >
      {children}
    </Button>
  );
};
