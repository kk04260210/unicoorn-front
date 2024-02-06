import { Dispatch, SetStateAction, useCallback } from 'react';
import { useAxios } from '../_wheel/security/ApiClient';
import { mailForm, mailData } from './mailTyep';
import { useNavigate } from 'react-router-dom';
// エンドポイントURLを設定ファイルから読み込み
const URL_API_OPT_CREATE = import.meta.env.VITE_REACT_APP_URL_API_OPT_CREATE;
const URL_FRONT_OTP_CREATE = import.meta.env.VITE_REACT_APP_URL_FRONT_OTP_CREATE;

export const useMailApi = () => {
  const navigate = useNavigate();
  // エンドポイントURLを設定ファイルから読み込み
  const { apiClient } = useAxios();
  // バックエンドへリクエスト
  const getmailData = useCallback(async (params: mailForm, setpassData: Dispatch<SetStateAction<mailData>>) => {
    // レスポンスの初期化
    let response: mailData = {
      status: '',
      errormessage: '',
    };

    await apiClient(true, true)
      .post(URL_API_OPT_CREATE, params)
      .then((res) => {
        response = res.data.body;
        setpassData(response);
      });
    //navigate(URL_FRONT_OTP_CREATE);
  }, []);
  return { getmailData };
};
