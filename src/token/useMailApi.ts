import { Dispatch, SetStateAction, useCallback } from 'react';
import { useAxios } from '../_wheel/security/ApiClient'; 
import { mailTokenForm, mailTokenData } from './mailTyep';
import { useNavigate } from 'react-router-dom';

// エンドポイントURLを設定ファイルから読み込み
const URL_API_PASSWORD_BEGIN = import.meta.env.VITE_REACT_APP_URL_API_PASSWORD_BEGIN;

const REDIRECT_URL = import.meta.env.VITE_REACT_APP_URL_FRONT_TOKEN;

export const useMailApi = () => {
  const navigate = useNavigate();
  // エンドポイントURLを設定ファイルから読み込み
  const { apiClient } = useAxios();
  // バックエンドへリクエスト
  const getmailData = useCallback(
    async (params: mailTokenForm, setpassData: Dispatch<SetStateAction<mailTokenData>>) => {
      // レスポンスの初期化
      let response: mailTokenData = {
        status: '',
        errormessage: '',
      };

      await apiClient(true, true)
        .post(URL_API_PASSWORD_BEGIN, params)
        .then((res) => {
          response = res.data.body.data;
          setpassData(response);
        });
      navigate(REDIRECT_URL);
    },
    [],
  );
  return { getmailData };
};
