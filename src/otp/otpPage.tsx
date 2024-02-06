import { FC, useEffect, useState } from 'react';
import { otpForm, otpData } from './otpType';
import { FormProvider, useForm } from 'react-hook-form';
import { useOtpApi } from './useOtpApi';
import { TmpOtp } from './templates/otpTmp';
import { useNavigate } from 'react-router-dom';

export const OtpPage: FC = () => {
  // エンドポイントURLを設定ファイルから読み込み
  const URL_FRONT_TOKEN = import.meta.env.VITE_REACT_APP_URL_FRONT_TOKEN;
  // データ取得処理
  const { getotpData } = useOtpApi();
  // Dogデータを取得して状態として登録
  const [otpData, setotpData] = useState<otpData>({
    status: '',
    errormessage: '',
  });

  // 入力データの定義
  const useFormMethods = useForm<otpForm>({
    defaultValues: {
      otp: '',
    },
    mode: 'onChange',
  });
  const { getValues } = useFormMethods;

  // データ取得ハンドラ
  const handleSearch = () => getotpData(getValues(), setotpData);
  //入力されたワンタイムパスワード
  const [otp, setotp] = useState('');
  //エラーメッセージ

  const navigate = useNavigate();
  const handleGoToPass = () => navigate(URL_FRONT_TOKEN);
  const onClickEvent = () => {
    handleSearch();
    handleGoToPass();
  };

  const [otpCheck, setotpCheck] = useState(false);

  const handleOtp = () => {
    if (otp == '') {
      setotpCheck(false);
    } else if (otp.length == 6) {
      setotpCheck(true);
    } else {
      setotpCheck(false);
    }
  };
  useEffect(() => {
    handleOtp();
  }, [otp]);

  return (
    <FormProvider {...useFormMethods}>
      <TmpOtp otp={otp} setotp={setotp} otpCheck={otpCheck} handleOtp={handleOtp} buttonOnClick={onClickEvent}>
        ワンタイムパスワード入力画面
      </TmpOtp>
    </FormProvider>
  );
};
