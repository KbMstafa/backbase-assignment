import { MapCoordinates } from '@Models/map-coordinates.model';

import { CityForecast } from './city-forecast.model';
import { CityWeather } from './city-weather.model';

export interface CityIdsProps {
  cityIds: number[];
}

export interface CityWeathersProps {
  cityWeathers: CityWeather[];
}

export interface CityCoordinatesProps {
  cityCoordinates: MapCoordinates;
}

export interface CityForecastListProps {
  cityForecastList: CityForecast[];
}
