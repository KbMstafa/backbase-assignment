import { MapCoordinates } from '@Models/map-coordinates.model';

export interface CityWeather {
  id: number;
  name: string;
  temperature: number;
  windSpeed: number;
  coordinates: MapCoordinates;
}
