import { State } from '@Models/store.model';

import { CityWeather } from '../models/city-weather.model';

interface WeatherSelectors {
  selectCityWeathers(state: State): CityWeather[];
  selectWeatherPending(state: State): boolean;
}

export const weatherSelectors: WeatherSelectors = {
  selectCityWeathers: (state: State): CityWeather[] => state.weather.cityWeathers,
  selectWeatherPending: (state: State): boolean => state.weather.pending,
};
