import { FC, useEffect, useState } from 'react';
import { mailTokenForm, mailTokenData } from './mailTyep';
import { FormProvider, useForm } from 'react-hook-form';
import { useMailApi } from './useMailApi';
import React from 'react';
import { MailTokenTmp } from './templates/mailTmp';

export const MailTokenPage: FC = () => {
  // エンドポイントURLを設定ファイルから読み込み
  const URL_API_ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT_URL;
  // データ取得処理
  const { getmailData } = useMailApi();

  // 入力データの定義
  const useFormMethods = useForm<mailTokenForm>({
    // FIXME ここどうにかして
    defaultValues: {
      userNo: '',
    },
    mode: 'onChange',
  });

  const { getValues } = useFormMethods;
  // Dogデータを取得して状態として登録
  const [mailTokenData, setmailData] = useState<mailTokenData>({
    status: '',
    errormessage: '',
  });

  // データ取得ハンドラ
  //入力された学籍番号
  const [userNo, setUserNo] = useState('');
  //エラーメッセージ
  //モーダルの状態
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getmailData(getValues(), setmailData);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [userNoCheck, setUserNoCheck] = useState(false);

  const handleTokenMail = () => {
    if (userNo == '') {
      return;
    } else if (userNo.length == 7 || userNo.length == 8) {
      setUserNoCheck(true);
    } else {
      setUserNoCheck(true);
    }
  };
  useEffect(() => {
    handleTokenMail();
  }, [userNo]);

  return (
    <FormProvider {...useFormMethods}>
      <MailTokenTmp
        mail={userNo}
        setmail={setUserNo}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        handleMailToken={handleTokenMail}
        mailCheck={userNoCheck}
      />
    </FormProvider>
  );
};
