import { Box, Container, Divider } from '@mui/material';
import { BackLink } from '../../common/components/BackLink';
import { FC } from 'react';
import { BaseLabel } from '../atoms/label';
import { Controller, useFormContext } from 'react-hook-form';
import { MailTokenInput } from '../atoms/input';
import { MailTokenButton } from '../atoms/button';
import { MailTokenModal } from '../organisms/modal';

type Props = {
  mail: string;
  setmail: (value: string) => void;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  handleMailToken: () => void;
  mailCheck: boolean;
};

export const MailTokenTmp: FC<Props> = (props: Props) => {
  const { mail, setmail, mailCheck, handleMailToken, handleOpen, handleClose, open } = props;

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
          パスワードの変更をご希望の方は、下記のフォームに 必要事項をご記入の上、「メール送信」をタップしてください。
          登録されているメールアドレスにパスワード変更画面のURLを記載したメールをお送りします。
        </span>
        <Box sx={{ width: '100%', maxWidth: '400px', marginTop: 3 }}>
          <MailTokenInput mail={mail} setmail={setmail} mailCheck={mailCheck} handleTokenMail={handleMailToken}>
            学籍番号
          </MailTokenInput>

          <MailTokenButton handleOpen={handleOpen} handleClose={handleClose} mailCheck={mailCheck}>
            メール送信
          </MailTokenButton>
          <MailTokenModal mailCheck={mailCheck} handleOpen={handleOpen} handleClose={handleClose} open={open} />
        </Box>
        <Divider />
      </Box>
    </Container>
  );
};
