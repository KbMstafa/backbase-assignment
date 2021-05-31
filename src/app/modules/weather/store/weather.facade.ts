import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@Models/store.model';

import { CityWeather } from '../models/city-weather.model';
import { getCityForecast, getCityWeathers, setPending } from '../store/weather.actions';
import { weatherSelectors } from '../store/weather.selectors';
import { MapCoordinates } from '@Models/map-coordinates.model';
import { CityForecast } from '../models/city-forecast.model';


@Injectable()
export class WeatherFacade {
  public cityWeathers$: Observable<CityWeather[]> = this.store.pipe(select(weatherSelectors.selectCityWeathers));
  public cityForecastList$: Observable<CityForecast[]> = this.store.pipe(select(weatherSelectors.selectCityForecastList));
  public weatherPending$: Observable<boolean> = this.store.pipe(select(weatherSelectors.selectWeatherPending));

  public constructor(
    private readonly store: Store<State>,
  ) {
  }

  public setPending(pending: boolean): void {
    this.store.dispatch(setPending({ pending }));
  }

  public getCityWeathers(cityIds: number[]): void {
    this.store.dispatch(getCityWeathers({ cityIds }));
  }

  public getCityForecast(cityCoordinates: MapCoordinates): void {
    this.store.dispatch(getCityForecast({ cityCoordinates }));
  }
}
