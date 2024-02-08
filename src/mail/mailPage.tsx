import { FC, useEffect, useState } from 'react';
import { mailForm, mailData } from './mailTyep';
import { FormProvider, useForm } from 'react-hook-form';
import { useMailApi } from './useMailApi';
import React from 'react';
import { MailTmp } from './templates/mailTmp';
import { useNavigate } from 'react-router-dom';

export const MailPage: FC = () => {
  const navigation = useNavigate();
  // エンドポイントURLを設定ファイルから読み込み
  const URL_API_ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT_URL;
  // データ取得処理
  const { getmailData } = useMailApi();
  // Dogデータを取得して状態として登録
  const [mailData, setmailData] = useState<mailData>({
    status: '',
    errormessage: '',
  });

  // 入力データの定義
  const useFormMethods = useForm<mailForm>({
    // FIXME ここどうにかして
    defaultValues: {
      userNo: '',
    },
    mode: 'onChange',
  });
  const { getValues } = useFormMethods;

  // データ取得ハンドラ
  //入力された学籍番号
  const [userNo, setUserNo] = useState('');
  //エラーメッセージ
  //モーダルの状態
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getmailData(getValues(), setmailData);
    setOpen(true);
    navigation('/otp', { state: getValues() });
  };
  const handleClose = () => setOpen(false);
  const [userNoCheck, setUserNoCheck] = useState(false);

  const handleMail = () => {
    if (userNo == '') {
      return;
    } else if (userNo.length == 7 || userNo.length == 8) {
      setUserNoCheck(true);
    } else {
      setUserNoCheck(false);
    }
  };
  useEffect(() => {
    handleMail();
  }, [userNo]);

  return (
    <FormProvider {...useFormMethods}>
      <MailTmp
        mail={userNo}
        setmail={setUserNo}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        handleMail={handleMail}
        mailCheck={userNoCheck}
      />
    </FormProvider>
  );
};
