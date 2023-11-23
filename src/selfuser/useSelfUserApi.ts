import { Dispatch, SetStateAction, useCallback } from 'react';

import { useMessage } from '../_wheel/common/MessageProvider';
import { useAxios } from '../_wheel/security/ApiClient';
import type { CreateUserParamsType, UpdateProfileParamsType } from './SelfUserTypesForManage';

const URL_NEW = import.meta.env.VITE_REACT_APP_URL_NEW;
const URL_PROFILE = import.meta.env.VITE_REACT_APP_URL_PROFILE;

export const useSelfUserApi = () => {
  const { outMessage } = useMessage();
  const { apiClient } = useAxios();

  const createUser = useCallback(async (params: CreateUserParamsType) => {
    await apiClient(true)
      .post(URL_NEW, params)
      .then((res) => {
        if (res.data.responseCode === '200') {
          outMessage('ユーザを新規に追加しました', false);
        } else {
          outMessage(res.data.message, true);
        }
      });
  }, []);

  const updateProfile = useCallback(async (params: UpdateProfileParamsType) => {
    await apiClient(true)
      .put(URL_PROFILE, params)
      .then((res) => {
        if (res.data.responseCode === '200') {
          outMessage('プロフィールを変更しました', false);
        } else {
          outMessage(res.data.message, true);
        }
      });
  }, []);

  return { createUser, updateProfile };
};
