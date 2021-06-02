import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import * as moment from 'moment';

import { ApiUrls } from '@Enums/api-urls.enum';
import { OpenWeatherUnits } from '@Enums/open-weather-units.enum';
import { environment } from '@Environment';
import { MapCoordinates } from '@Models/map-coordinates.model';
import { DeepPartial } from '@Types/deep-partial.type';

import { CityForecast } from '../models/city-forecast.model';
import { CityWeather } from '../models/city-weather.model';
import { ForecastResponse, ForecastResponseHourly } from '../models/forecast-response.model';
import { WeatherResponse } from '../models/weather-response.model';

import { WeatherRepository } from './weather.repository';

describe('WeatherRepository', (): void => {
  let repository: WeatherRepository;
  let httpMock: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        WeatherRepository,
      ],
    });

    repository = TestBed.inject(WeatherRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach((): void => {
    httpMock.verify();
  });

  describe('getCityWeather', (): void => {
    it('should get city weather', (done: DoneFn): void => {
      const mockedCityId: number = 1;
      const mockedWeatherResponse: DeepPartial<WeatherResponse> = {
        id: 1,
        name: 'name',
        main: { temp: 3 },
        wind: { speed: 5 },
        coord: { lat: 22, lon: 23 },
      };

      repository.getCityWeather(mockedCityId)
        .subscribe((cityWeather: CityWeather) => {
          expect(cityWeather).toEqual({
            id: <number>mockedWeatherResponse.id,
            name: <string>mockedWeatherResponse.name,
            temperature: (<WeatherResponse['main']>mockedWeatherResponse.main).temp,
            windSpeed: (<WeatherResponse['wind']>mockedWeatherResponse.wind).speed,
            coordinates: {
              lat: (<WeatherResponse['coord']>mockedWeatherResponse.coord).lat,
              lon: (<WeatherResponse['coord']>mockedWeatherResponse.coord).lon,
            },
          });

          done();
        });

      const params: HttpParams = new HttpParams({ fromObject: {
        id: mockedCityId,
        appid: environment.openWeatherApi.key,
        units: OpenWeatherUnits.Metric,
      } });

      const getCityWeatherRequest: TestRequest = httpMock.expectOne(
        `${environment.openWeatherApi.baseUrl}/${ApiUrls.Weather}?${params.toString()}`,
      );
      expect(getCityWeatherRequest.request.method).toBe("GET");

      getCityWeatherRequest.flush(mockedWeatherResponse);
    });
  });

  describe('getCityForecast', (): void => {
    it('should get city forecast', (done: DoneFn): void => {
      const mockedCityCoordinates: MapCoordinates = { lat: 22, lon: 23 };
      const mockedForecastResponseHourly: Partial<ForecastResponseHourly> = {
        dt: moment().unix(),
        temp: 1,
        wind_speed: 3,
      };
      const mockedForecastResponse: DeepPartial<ForecastResponse> = { hourly: [ mockedForecastResponseHourly ] };

      repository.getCityForecast(mockedCityCoordinates)
        .subscribe((cityForecastList: CityForecast[]) => {
          expect(cityForecastList).toEqual([{
            time: moment((<number>mockedForecastResponseHourly.dt) * 1000).format('HH:mm A'),
            temperature: <number>mockedForecastResponseHourly.temp,
            windSpeed: <number>mockedForecastResponseHourly.wind_speed,
          }]);

          done();
        });

      const params: HttpParams = new HttpParams({ fromObject: {
        ...mockedCityCoordinates,
        appid: environment.openWeatherApi.key,
        units: OpenWeatherUnits.Metric,
        exclude: 'current,minutely,daily,alerts'
      } });

      const getCityWeatherRequest: TestRequest = httpMock.expectOne(
        `${environment.openWeatherApi.baseUrl}/${ApiUrls.OneCall}?${params.toString()}`,
      );
      expect(getCityWeatherRequest.request.method).toBe("GET");

      getCityWeatherRequest.flush(mockedForecastResponse);
    });
  });
});
