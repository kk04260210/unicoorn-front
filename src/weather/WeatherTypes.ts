export type WeatherParamsType = {
  cityCode: string;
};

export type WeatherType = {
  locationName: string;
  description: string;
  forecasts: Array<OneDayWeatherType>;
};

export type OneDayWeatherType = {
  dateLabel: string;
  telop: string;
  image: string;
};
