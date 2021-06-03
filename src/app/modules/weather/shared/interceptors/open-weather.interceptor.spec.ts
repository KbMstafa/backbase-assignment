import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OpenWeatherUnits } from '@Enums/open-weather-units.enum';
import { environment } from '@Environment';

import { OPEN_WEATHER_INTERCEPTOR_PROVIDER } from './open-weather.interceptor';

describe('OpenWeatherInterceptor', (): void => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        OPEN_WEATHER_INTERCEPTOR_PROVIDER,
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  describe('intercept', (): void => {
    it('should not add appid and units params', (done: DoneFn): void => {
      const mockedUrl: string = 'http://mocked-url';
      const params: HttpParams = new HttpParams({ fromObject: {
        appid: environment.openWeatherApi.key,
        units: OpenWeatherUnits.Metric,
      } });

      httpClient.get(mockedUrl).subscribe((): void => {
        expect().nothing();

        done();
      });

      const request: TestRequest = httpMock.expectOne(`${mockedUrl}?${params}`);

      request.flush(null);
    });
  });
});
