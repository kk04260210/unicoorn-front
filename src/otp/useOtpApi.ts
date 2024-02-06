import { Dispatch, SetStateAction, useCallback } from 'react';
import { useAxios } from '../_wheel/security/ApiClient';
import { otpForm, otpData } from './otpType';
// エンドポイントURLを設定ファイルから読み込み
const URL_API_OTP = import.meta.env.VITE_REACT_APP_URL_API_OTP_CHECK;

export const useOtpApi = () => {
  // エンドポイントURLを設定ファイルから読み込み
  const { apiClient } = useAxios();
  // バックエンドへリクエスト
  const getotpData = useCallback(async (params: otpForm, setpassData: Dispatch<SetStateAction<otpData>>) => {
    // レスポンスの初期化
    let response: otpData = {
      status: '',
      errormessage: '',
    };

    await apiClient(true, true)
      .post(URL_API_OTP, params)
      .then((res) => {
        response = res.data.body.data;
        setpassData(response);
      });
  }, []);
  return { getotpData };
};
