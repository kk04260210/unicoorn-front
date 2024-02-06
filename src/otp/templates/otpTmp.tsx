import { Container } from '@mui/material';
import { OrgOtp } from '../organisms/orgotp';
import { BackLink } from '../../common/components/BackLink';
import { FC } from 'react';

type Props = {
  otp: string;
  setotp: (value: string) => void;
  children: React.ReactNode;
  otpCheck: boolean;
  handleOtp: () => void;
  buttonOnClick: () => void;
};

export const TmpOtp: FC<Props> = (props: Props) => {
  const {  otp, setotp, otpCheck, handleOtp, buttonOnClick } = props;
  return (
    <Container component="main" maxWidth="md">
      <BackLink />
      <OrgOtp
        otp={otp}
        setotp={setotp}
        otpCheck={otpCheck}
        handleOtp={handleOtp}
        buttonOnClick={buttonOnClick}
      >
        ワンタイムパスワード入力画面
      </OrgOtp>
    </Container>
  );
};
