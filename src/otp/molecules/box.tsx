import { Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { InputOtp } from '../atoms/input';
import { ButtonOtp } from '../atoms/button';
import { FC } from 'react';

type Props = {
  otp: string;
  setotp: (value: string) => void;
  otpCheck: boolean;
  handleOtp: () => void;
  buttonOnClick: () => void;
};

export const BoxOtp: FC<Props> = (props: Props) => {
  const { otp, setotp, otpCheck, handleOtp, buttonOnClick } = props;
  return (
    <Box sx={{ width: '100%', maxWidth: '400px', marginTop: 3 }}>
      <InputOtp otp={otp} setotp={setotp} handleOtp={handleOtp} otpCheck={otpCheck}>
        ワンタイムパスワード
      </InputOtp>
      {/* <Controller
        name="otp"
        rules={{ required: 'ワンタイムパスワードを入力してください' }}
        render={({ fieldState }) => (
        )}
      /> */}
      <ButtonOtp otpCheck={otpCheck} buttonOnClick={buttonOnClick}>
        検証
      </ButtonOtp>
    </Box>
  );
};
