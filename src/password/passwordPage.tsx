import { FC, useEffect, useState } from 'react';
import { passData, passForm } from './passwordTypes';
import { FormProvider, useForm } from 'react-hook-form';
import { usePassApi } from './usePasswordApi';
import React from 'react';
import { TmpPass } from './templates/passTmp';

export const PasswordPage: FC = () => {
  // エンドポイントURLを設定ファイルから読み込み
  const URL_API_ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT_URL;
  // データ取得処理
  const { getpassData } = usePassApi();
  // Dogデータを取得して状態として登録
  const [passData, setpassData] = useState<passData>({
    status: '',
    errormessage: '',
  });

  // 入力されたパスワード
  const [password, setPassword] = useState('');
  // 入力されたパスワードのタイプ
  const [passwordType, setPasswordType] = useState('password');
  //　再入力されたパスワード
  const [repassword, setrePassword] = useState('');
  // 再入力されたパスワードのタイプ
  const [repasswordType, setrePasswordType] = useState('password');
  //エラーメッセージ
  const [passError, setpassError] = useState('');
  //入力されたパスワードと再入力されたパスワードの比較
  const [passwordMatch, setPasswordMatch] = useState(false);
  //モーダルの状態
  const [open, setOpen] = React.useState(false);

  // 入力データの定義
  const useFormMethods = useForm<passForm>({
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
  });

    const { control, getValues } = useFormMethods;

  // データ取得ハンドラ
  const handleSearch = () => getpassData(getValues(), setpassData);
  const handleOpen = () => {
    handleSearch();
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleCheck();
  }, [password, repassword]);

  const handleCheck = () => {
    if (password == '' && repassword == '') {
      //入力されたパスワードと再入力されたパスワードが空の場合
      return;
    } else if (password.length > 50) {
      setPasswordMatch(false);
    } else if (password === repassword) {
      setPasswordMatch(true);
      // 一致する場合の処理をここに記述
    } else {
      setPasswordMatch(false);
      // 一致しない場合の処理をここに記述
    }
  };

  return (
      <FormProvider {...useFormMethods}>
        <TmpPass
          control={control}
          password={password}
          setPassword={setPassword}
          passwordType={passwordType}
          setPasswordType={setPasswordType}
          passError={passError}
          setpassError={setpassError}
          repassword={repassword}
          setrePassword={setrePassword}
          repasswordType={repasswordType}
          setrePasswordType={setrePasswordType}
          passwordMatch={passwordMatch}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleCheck={handleCheck}
          open={open}
        />
      </FormProvider>
  );
};
