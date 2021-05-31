import { Injectable } from '@angular/core';
import { MapCoordinates } from '@Models/map-coordinates.model';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { combineLatest, Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';

import { CityCoordinatesProps, CityIdsProps } from '../models/action-props.model';
import { CityForecast } from '../models/city-forecast.model';
import { CityWeather } from '../models/city-weather.model';
import { WeatherRepository } from '../shared/weather.repository';
import { getCityForecastSuccess, getCityWeathersSuccess, WeatherActionsTypes } from '../store/weather.actions';
import { GetCityForecastSuccessActionType, GetCityWeathersSuccessActionType } from '../types/action.types';

import { WeatherFacade } from './weather.facade';

@Injectable()
export class WeatherEffects {
  public getCityWeathers$: CreateEffectMetadata = createEffect(
    (): Observable<GetCityWeathersSuccessActionType> => (
      this.actions$
        .pipe(
          ofType(WeatherActionsTypes.GetCityWeathers),
          tap(this.weatherFacade.setPending.bind(this.weatherFacade, true)),
          switchMap((action: CityIdsProps): Observable<CityWeather[]> => {
            const cityWeatherApis: Observable<CityWeather>[] = action.cityIds.map(
              this.weatherRepository.getCityWeather.bind(this.weatherRepository)
            );

            return combineLatest(cityWeatherApis);
          }),
          map((cityWeathers: CityWeather[]): GetCityWeathersSuccessActionType => getCityWeathersSuccess({ cityWeathers })),
          tap(this.weatherFacade.setPending.bind(this.weatherFacade, false)),
          finalize(this.weatherFacade.setPending.bind(this.weatherFacade, false)),
        )
    ),
  );

  public getCityForecast$: CreateEffectMetadata = createEffect(
    (): Observable<GetCityForecastSuccessActionType> => (
      this.actions$
        .pipe(
          ofType(WeatherActionsTypes.GetCityForecast),
          tap(this.weatherFacade.setPending.bind(this.weatherFacade, true)),
          map(({ cityCoordinates }: CityCoordinatesProps): MapCoordinates => cityCoordinates),
          switchMap(this.weatherRepository.getCityForecast.bind(this.weatherRepository)),
          map((cityForecastList: CityForecast[]): GetCityForecastSuccessActionType => getCityForecastSuccess({ cityForecastList })),
          tap(this.weatherFacade.setPending.bind(this.weatherFacade, false)),
          finalize(this.weatherFacade.setPending.bind(this.weatherFacade, false)),
        )
    ),
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly weatherFacade: WeatherFacade,
    private readonly weatherRepository: WeatherRepository,
  ) {
  }
}
