import { Box, Container, Divider } from '@mui/material';
import { BackLink } from '../../common/components/BackLink';
import { FC } from 'react';
import { BaseLabel } from '../atoms/label';
import { Controller, useFormContext } from 'react-hook-form';
import { MailInput } from '../atoms/input';
import { MailButton } from '../atoms/button';
import { MailModal } from '../organisms/modal';

type Props = {
  mail: string;
  setmail: (value: string) => void;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  handleMail: () => void;
  mailCheck: boolean;
};

export const MailTmp: FC<Props> = (props: Props) => {
  const { mail, setmail, mailCheck, handleMail, handleOpen, handleClose, open } = props;
  return (
    <Container component="main" maxWidth="md">
      <BackLink />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <BaseLabel id="modal-modal-title" variant="h4" component="h1">
          メール送信
        </BaseLabel>
        <span>
          ログインに必要な情報をお忘れの方は、下記のフォームに
          必要事項をご記入の上、「メール送信」をタップしてください。
          登録されているメールアドレスに「ワンタイムパスワード」を 記載したメールをお送りします。
        </span>
        <Box sx={{ width: '100%', maxWidth: '400px', marginTop: 3 }}>
          <MailInput mail={mail} setmail={setmail} mailCheck={mailCheck} handleMail={handleMail}>
            学籍番号
          </MailInput>

          <MailButton handleOpen={handleOpen} handleClose={handleClose} mailCheck={mailCheck}>
            メール送信
          </MailButton>
          <MailModal handleOpen={handleOpen} handleClose={handleClose} open={open} />
        </Box>
        <Divider />
      </Box>
    </Container>
  );
};
