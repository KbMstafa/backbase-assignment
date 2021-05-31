import { State } from '@Models/store.model';

import { CityForecast } from '../models/city-forecast.model';
import { CityWeather } from '../models/city-weather.model';

interface WeatherSelectors {
  selectCityWeathers(state: State): CityWeather[];
  selectCityForecastList(state: State): CityForecast[],
  selectWeatherPending(state: State): boolean;
}

export const weatherSelectors: WeatherSelectors = {
  selectCityWeathers: (state: State): CityWeather[] => state.weather.cityWeathers,
  selectCityForecastList: (state: State): CityForecast[] => state.weather.cityForecastList,
  selectWeatherPending: (state: State): boolean => state.weather.pending,
};
