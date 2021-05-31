import { CityWeather } from '../models/city-weather.model';

export interface WeatherState {
  cityWeathers: CityWeather[];
  pending: boolean;
}
