import { State } from '@Models/store.model';
import { createSelector, MemoizedSelector } from '@ngrx/store';

import { CityForecast } from '../shared/models/city-forecast.model';
import { CityWeather } from '../shared/models/city-weather.model';

import { WeatherState } from './weather.state';

interface WeatherSelectors {
  selectCityWeathers: MemoizedSelector<State, CityWeather[]>;
  selectCityForecastList: MemoizedSelector<State, CityForecast[]>,
  selectWeatherPending: MemoizedSelector<State, boolean>;
}

export const weatherSelectors: WeatherSelectors = {
  selectCityWeathers: createSelector(
    (state: State): CityWeather[] => (<WeatherState>state.weather).cityWeathers,
    (cityWeathers: CityWeather[]): CityWeather[] => cityWeathers,
  ),
  selectCityForecastList: createSelector(
    (state: State): CityForecast[] => (<WeatherState>state.weather).cityForecastList,
    (cityForecastList: CityForecast[]): CityForecast[] => cityForecastList,
  ),
  selectWeatherPending: createSelector(
    (state: State): boolean => (<WeatherState>state.weather).pending,
    (pending: boolean): boolean => pending,
  ),
};
