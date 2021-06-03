import { CityForecast } from '../shared/models/city-forecast.model';
import { CityWeather } from '../shared/models/city-weather.model';

export interface WeatherState {
  cityWeathers: CityWeather[];
  pending: boolean;
  cityForecastList: CityForecast[];
}
