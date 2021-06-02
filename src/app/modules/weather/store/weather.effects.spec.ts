import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { SpyObject } from '@Types/spy-object.type';

import { CityForecast } from '../models/city-forecast.model';
import { CityWeather } from '../models/city-weather.model';
import { WeatherRepository } from '../shared/weather.repository';
import { GetCityForecastSuccessActionType, GetCityWeathersSuccessActionType } from '../types/action.types';

import { WeatherActionsTypes } from './weather.actions';
import { WeatherEffects } from './weather.effects';
import { WeatherFacade } from './weather.facade';

describe('WeatherEffects', (): void => {
  let actions$: Observable<Action>;
  let effects: WeatherEffects;
  let mockedWeatherFacade: SpyObject<WeatherFacade>;
  let mockedWeatherRepository: SpyObject<WeatherRepository>;

  beforeEach((): void => {
    mockedWeatherFacade = jasmine.createSpyObj('WeatherFacade', [ 'setPending' ]);
    mockedWeatherRepository = jasmine.createSpyObj('WeatherRepository', [ 'getCityWeather', 'getCityForecast' ]);

    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        provideMockActions(() => actions$),
        { provide: WeatherFacade, useValue: mockedWeatherFacade },
        { provide: WeatherRepository, useValue: mockedWeatherRepository },
      ],
    });

    effects = TestBed.inject(WeatherEffects);
  });

  describe('getCityWeathers', (): void => {
    it('should call getCityWeathersSuccess action', (done: DoneFn): void => {
      const mockedCityIds: number[] = [1];
      mockedWeatherRepository.getCityWeather.and.returnValues(
        ...(<Observable<CityWeather>[]>mockedCityIds.map((cityId: number): Observable<Partial<CityWeather>> => of({ id: cityId })))
      );

      actions$ = of({ type: WeatherActionsTypes.GetCityWeathers, cityIds: mockedCityIds });

      (<Observable<any>><unknown>effects.getCityWeathers$)
        .pipe(take(1))
        .subscribe((action: GetCityWeathersSuccessActionType): void => {
          expect(action).toEqual({
            type: WeatherActionsTypes.GetCityWeathersSuccess,
            cityWeathers: <CityWeather[]>mockedCityIds.map((cityId: number): Partial<CityWeather> => ({ id: cityId })),
          });

          done();
        });
    });
  });

  describe('getCityForecast', (): void => {
    it('should call GetCityForecastSuccess action', (done: DoneFn): void => {
      const mockedCityForecastList: Partial<CityForecast>[] = [{ time: 'time' }];
      mockedWeatherRepository.getCityForecast.and.returnValue(<Observable<CityForecast[]>>of(mockedCityForecastList));

      actions$ = of({ type: WeatherActionsTypes.GetCityForecast, cityForecastList: mockedCityForecastList });

      (<Observable<any>><unknown>effects.getCityForecast$)
        .pipe(take(1))
        .subscribe((action: GetCityForecastSuccessActionType): void => {
          expect(action).toEqual({
            type: WeatherActionsTypes.GetCityForecastSuccess,
            cityForecastList: <CityForecast[]>mockedCityForecastList,
          });

          done();
        });
    });
  });
});
