import { CityForecast } from '../models/city-forecast.model';
import { CityWeather } from '../models/city-weather.model';

export interface WeatherState {
  cityWeathers: CityWeather[];
  pending: boolean;
  cityForecastList: CityForecast[];
}
