import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { MapCoordinates } from '@Models/map-coordinates.model';
import { State } from '@Models/store.model';
import { SpyObject } from '@Types/spy-object.type';

import { getCityForecast, getCityWeathers, setPending } from './weather.actions';
import { WeatherFacade } from './weather.facade';

describe('WeatherFacade', (): void => {
  let facade: WeatherFacade;
  let mockedStore: SpyObject<Store<State>>;

  beforeEach((): void => {
    mockedStore = jasmine.createSpyObj(Store, [ 'dispatch', 'pipe' ]);

    TestBed.configureTestingModule({
      providers: [
        WeatherFacade,
        { provide: Store, useValue: mockedStore },
      ],
    });

    facade = TestBed.inject(WeatherFacade);
  });

  describe('setPending', (): void => {
    it('should dispatch getCities action', (): void => {
      const mockedPending: boolean = true;

      facade.setPending(mockedPending);

      expect(mockedStore.dispatch).toHaveBeenCalledOnceWith(setPending({ pending: mockedPending }));
    });
  });

  describe('getCityWeathers', (): void => {
    it('should dispatch getCityWeathers action', (): void => {
      const mockedCityIds: number[] = [1, 2];

      facade.getCityWeathers(mockedCityIds);

      expect(mockedStore.dispatch).toHaveBeenCalledOnceWith(getCityWeathers({ cityIds: mockedCityIds }));
    });
  });

  describe('getCityForecast', (): void => {
    it('should dispatch getCityForecast action', (): void => {
      const mockedCityCoordinates: MapCoordinates = { lat: 1, lon: 2 };

      facade.getCityForecast(mockedCityCoordinates);

      expect(mockedStore.dispatch).toHaveBeenCalledOnceWith(getCityForecast({ cityCoordinates: mockedCityCoordinates }));
    });
  });
});
