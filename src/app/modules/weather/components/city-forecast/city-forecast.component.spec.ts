import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { MockModule } from 'ng-mocks';
import { Observable, of, Subject } from 'rxjs';
import { ChartOptions } from 'chart.js';

import { SpyObject } from '@Types/spy-object.type';

import { TEMPERATURE_DATASET_CONFIGURATION } from '../../consts/temperature-dataset-conf.const';
import { WIND_SPEED_DATASET_CONFIGURATION } from '../../consts/wind-speed-dataset-conf.const';
import { CityForecast } from '../../models/city-forecast.model';
import { WeatherFacade } from '../../store/weather.facade';
import * as forecastUtil from '../../utils/get-forecast-options.util';

import { CityForecastComponent } from './city-forecast.component';
import { ChartModule } from 'primeng/chart';

describe('CityForecastComponent', (): void => {
  const mockedForecastOptions: ChartOptions = { responsive: true };
  const cityForecastListSubject$: Subject<Partial<CityForecast>[]> = new Subject();
  let component: CityForecastComponent;
  let fixture: ComponentFixture<CityForecastComponent>;
  let mockedWeatherFacade: Partial<WeatherFacade>;
  let mockedTranslateService: SpyObject<TranslateService>;

  beforeEach(async (): Promise<void> => {
    mockedWeatherFacade = {
      cityForecastList$: <Observable<CityForecast[]>>cityForecastListSubject$.asObservable(),
    };
    mockedTranslateService = jasmine.createSpyObj('TranslateService', [ 'instant' ]);
    mockedTranslateService.instant.and.callFake((key: string): string => key);

    spyOn(forecastUtil, 'getCityForecastOptions').and.returnValue(mockedForecastOptions);

    await TestBed.configureTestingModule({
      imports: [
        MockModule(ChartModule),
      ],
      declarations: [
        CityForecastComponent,
      ],
      providers: [
        { provide: WeatherFacade, useValue: mockedWeatherFacade },
        { provide: TranslateService, useValue: mockedTranslateService },
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(CityForecastComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('ngOnInit', (): void => {
    it('should set cityForecastOptions property', (): void => {
      expect(component.cityForecastOptions).toEqual(mockedForecastOptions);
    });

    it('should set cityForecastData property', (): void => {
      const mockedLabels: string[] = ['1', '2', '3'];
      const mockedTemperatureData: number[] = [1, 2, 3];
      const mockedWindSpeedData: number[] = [1, 2, 3];
      const mockedCityForecastList: Partial<CityForecast>[] = [];
      mockedLabels.forEach((label: string, index: number): void => {
        mockedCityForecastList.push({
          time: mockedLabels[index],
          temperature: mockedTemperatureData[index],
          windSpeed: mockedWindSpeedData[index],
        });
      });

      cityForecastListSubject$.next(mockedCityForecastList);

      expect(component.cityForecastData).toEqual({
        labels: mockedLabels,
        datasets: [
          {
            ...WIND_SPEED_DATASET_CONFIGURATION,
            label: 'WEATHER.FORECAST.WIND_SPEED',
            data: mockedWindSpeedData,
          },
          {
            ...TEMPERATURE_DATASET_CONFIGURATION,
            label: 'WEATHER.FORECAST.TEMPERATURE',
            data: mockedTemperatureData,
          },
        ]
      });
    });
  });

  describe('ngOnDestroy', (): void => {
    it('should call cityForecastSubscription.unsubscribe', (): void => {
      component['cityForecastSubscription'] = of(1).subscribe();

      const cityForecastSubscriptionSpy: jasmine.Spy = spyOn(component['cityForecastSubscription'], 'unsubscribe');

      fixture.destroy();

      expect(cityForecastSubscriptionSpy).toHaveBeenCalledTimes(1);
    });

    it('shouldn\'t call cityForecastSubscription.unsubscribe', (): void => {
      component['cityForecastSubscription'] = null;

      fixture.destroy();

      expect().nothing();
    });
  });
});
