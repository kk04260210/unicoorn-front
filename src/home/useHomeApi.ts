import { Dispatch, SetStateAction, useCallback } from 'react';

import { useAxios } from '../_wheel/security/ApiClient';
import type { UserType } from '../common/types/UserTypes';

const URL_PROFILE = import.meta.env.VITE_REACT_APP_URL_PROFILE;

export const useHomeApi = () => {
  const { apiClient } = useAxios();

  const getProfile = useCallback(async (setUser: Dispatch<SetStateAction<UserType | undefined>>) => {
    await apiClient(true)
      .get(URL_PROFILE)
      .then((res) => {
        setUser(res.data.body);
      });
  }, []);

  return { getProfile };
};
