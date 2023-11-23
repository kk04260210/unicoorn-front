import { Dispatch, SetStateAction, useCallback } from 'react';
import { useAxios } from '../_wheel/security/ApiClient';
import { BmiData, BmiForm } from './BmiTypes';

const URL_API_BMI = import.meta.env.VITE_REACT_APP_URL_API_BMI;

export const useBmiApi = () => {
  const { apiClient } = useAxios();

  const getBmiData = useCallback(async (params: BmiForm, setBmiData: Dispatch<SetStateAction<BmiData>>) => {
    let response: BmiData = {
      ans: '',
      path: '',
      comment: '',
    };

    await apiClient(true, true)
      .get(URL_API_BMI + '?cm=' + params.height + '&kg=' + params.weight)
      .then((res) => {
        response = res.data.body;
        setBmiData(response);
      });
  }, []);

  return { getBmiData };
};
