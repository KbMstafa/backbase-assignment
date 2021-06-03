import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

import { SpyObject } from '@Types/spy-object.type';

import { Cities } from '../enums/cities.enum';
import { WeatherFacade } from '../../store/weather.facade';

import { CityWeathersResolver } from './city-weathers.resolver';

describe('CityWeathersResolver', (): void => {
  let resolver: CityWeathersResolver;
  let mockedWeatherFacade: SpyObject<WeatherFacade>;

  beforeEach((): void => {
    mockedWeatherFacade = {
      ...jasmine.createSpyObj('WeatherFacade', [ 'getCityWeathers' ]),
      weatherPending$: of(false),
    };

    TestBed.configureTestingModule({
      providers: [
        CityWeathersResolver,
        { provide: WeatherFacade, useValue: mockedWeatherFacade },
      ],
    });

    resolver = TestBed.inject(CityWeathersResolver);
  });

  describe('resolve', (): void => {
    it('should call weatherFacade.getCityWeathers', (done: DoneFn): void => {
      resolver.resolve()
        .pipe(take(1))
        .subscribe((): void => {
          expect(mockedWeatherFacade.getCityWeathers).toHaveBeenCalledOnceWith(
            Object.values(Cities).map((cityId: string) => Number(cityId)),
          );

          done();
        });
    });
  });
});
