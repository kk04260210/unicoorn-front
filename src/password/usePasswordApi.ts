import { Dispatch, SetStateAction, useCallback } from 'react';
import { useAxios } from '../_wheel/security/ApiClient';
import { passForm,passData } from './passwordTypes';
// エンドポイントURLを設定ファイルから読み込み
const URL_API_PASSWORD = import.meta.env.VITE_REACT_APP_URL_API_PASSWORD_CHANGE;

export const usePassApi = () => {
  // エンドポイントURLを設定ファイルから読み込み
  const { apiClient } = useAxios();
  // バックエンドへリクエスト
  const getpassData = useCallback(async (params: passForm, setpassData: Dispatch<SetStateAction<passData>>) => {
    // レスポンスの初期化
    let response: passData = {
      status: '',
      errormessage: '',
    };

    await apiClient(true, true)
      .post(URL_API_PASSWORD, params)
      .then((res) => {
        response = res.data.body.data;
        setpassData(response);
      });
  }, []);

  return { getpassData };
  
};
