import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiUrls } from '@Enums/api-urls.enum';
import { OpenWeatherUnits } from '@Enums/open-weather-units.enum';
import { environment } from '@Environment';

import { CityWeather } from '../models/city-weather.model';
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
        })),
      );
  }
}
