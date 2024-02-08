import { Box, Divider } from '@mui/material';
import { BaseLabel } from '../../mail/atoms/label';
import { BoxOtp } from '../molecules/box';
import { FC } from 'react';

type Props = {
  otp: string;
  setotp: (value: string) => void;
  children: React.ReactNode;
  otpCheck: boolean;
  handleOtp: () => void;
  buttonOnClick: () => void;
  
};

export const OrgOtp: FC<Props> = (props: Props) => {
  const { otp, setotp, otpCheck, handleOtp, buttonOnClick } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <BaseLabel id="modal-modal-title" variant="h4" component="h1">
        ワンタイムパスワード入力画面
      </BaseLabel>
      <span>ご登録されたメールアドレスに送信された 「ワンタイムパスワード」入力してください。</span>
      <BoxOtp 
        otp={otp} 
        setotp={setotp} 
        otpCheck={otpCheck} 
        handleOtp={handleOtp} 
        buttonOnClick={buttonOnClick} 
        />
      <Divider />
    </Box>
  );
};
