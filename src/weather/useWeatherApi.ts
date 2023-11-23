import { Dispatch, SetStateAction, useCallback } from 'react';

import { useAxios } from '../_wheel/security/ApiClient';
import type { WeatherParamsType, WeatherType } from './WeatherTypes';

const URL_GET_API_WEATHER = import.meta.env.VITE_REACT_APP_URL_API_WEATHER;

export const useWeatherApi = () => {
  const { apiClient } = useAxios();

  const getWeatherList = useCallback(
    async (params: WeatherParamsType, setWeather: Dispatch<SetStateAction<WeatherType | undefined>>) => {
      let data: WeatherType;

      await apiClient(true, true)
        .get(URL_GET_API_WEATHER + '?cityCode=' + params.cityCode)
        .then((res) => {
          data = res.data.body;
          setWeather(data);
        });
    },
    []
  );

  return { getWeatherList };
};
