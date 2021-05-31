import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { Cities } from '../enums/cities.enum';
import { WeatherFacade } from '../store/weather.facade';

@Injectable()
export class CityWeathersResolver implements Resolve<void> {

  public constructor(
    private readonly weatherFacade: WeatherFacade,
  ) {
  }

  public resolve(): Observable<void> {
    this.weatherFacade.getCityWeathers(
      Object.values(Cities).map((cityId: string) => Number(cityId)),
    );

    return this.weatherFacade.weatherPending$
      .pipe(
        filter((pending: boolean): boolean => !pending),
        map((): void => { return; }),
        take(1),
      );
  }
}
