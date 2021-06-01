import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { ApiUrls } from '@Enums/api-urls.enum';
import { OpenWeatherUnits } from '@Enums/open-weather-units.enum';
import { environment } from '@Environment';
import { MapCoordinates } from '@Models/map-coordinates.model';

import { CityForecast } from '../models/city-forecast.model';
import { CityWeather } from '../models/city-weather.model';
import { ForecastResponse, ForecastResponseHourly } from '../models/forecast-response.model';
import { WeatherResponse } from '../models/weather-response.model';

@Injectable()
export class WeatherRepository {

  public constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getCityWeather(cityId: number): Observable<CityWeather> {
    const url: string = `${environment.openWeatherApi.baseUrl}/${ApiUrls.Weather}`;
    const params: Params = {
      id: cityId,
      appid: environment.openWeatherApi.key,
      units: OpenWeatherUnits.Metric,
    };

    return this.httpClient.get<WeatherResponse>(url , { params })
      .pipe(
        map((weather: WeatherResponse): CityWeather => ({
          id: weather.id,
          name: weather.name,
          temperature: weather.main.temp,
          windSpeed: weather.wind.speed,
          coordinates: {
            lat: weather.coord.lat,
            lon: weather.coord.lon,
          }
        })),
      );
  }

  public getCityForecast(cityCoordinates: MapCoordinates): Observable<CityForecast[]> {
    const url: string = `${environment.openWeatherApi.baseUrl}/${ApiUrls.OneCall}`;
    const params: Params = {
      ...cityCoordinates,
      appid: environment.openWeatherApi.key,
      units: OpenWeatherUnits.Metric,
      exclude: 'current,minutely,daily,alerts'
    };

    return this.httpClient.get<ForecastResponse>(url , { params })
      .pipe(
        map((cityForecast: ForecastResponse): CityForecast[] => (
          cityForecast.hourly
            .slice(0, 5)
            .map((cityForecastHourly: ForecastResponseHourly) => ({
              time: moment(cityForecastHourly.dt * 1000).format('HH:mm A'),
              temperature: cityForecastHourly.temp,
              windSpeed: cityForecastHourly.wind_speed,
            }))
        )),
      );
  }
}
