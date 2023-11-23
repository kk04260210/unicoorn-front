import { Dispatch, SetStateAction, useCallback } from 'react';

import { useAxios } from '../_wheel/security/ApiClient';
import type { GourmetParamsType, ShopType } from './GourmetTypes';

const URL_API_GOURMET = import.meta.env.VITE_REACT_APP_URL_API_GOURMET;

export const useGourmetApi = () => {
  const { apiClient } = useAxios();

  const getGourmetList = useCallback(
    async (params: GourmetParamsType, setList: Dispatch<SetStateAction<Array<ShopType>>>) => {
      let list: Array<ShopType> = [];

      await apiClient(true, true)
        .get(URL_API_GOURMET + '?shopName=' + params.shopName + '&areaCode=' + params.areaCode)
        .then((res) => {
          list = res.data.body.shops;
          setList(list);
        });
    },
    []
  );

  return { getGourmetList };
};
