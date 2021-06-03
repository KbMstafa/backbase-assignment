import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { MockComponent, MockModule } from 'ng-mocks';
import { TableModule } from 'primeng/table';

import { MapCoordinates } from '@Models/map-coordinates.model';
import { SpyObject } from '@Types/spy-object.type';

import { CityForecastComponent } from '../city-forecast/city-forecast.component';
import { CityWeather } from '../../shared/models/city-weather.model';
import { WeatherFacade } from '../../store/weather.facade';

import { CitiesComponent } from './cities.component';
import { ChangeDetectorRef } from '@angular/core';

describe('CitiesComponent', (): void => {
  const weatherPendingSubject$: Subject<boolean> = new Subject();
  const cityWeathersSubject$: Subject<Partial<CityWeather>[]> = new Subject();
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;
  let mockedWeatherFacade: SpyObject<WeatherFacade>;

  beforeEach(async (): Promise<void> => {
    mockedWeatherFacade = {
      ...jasmine.createSpyObj('WeatherFacade', [ 'getCityForecast' ]),
      weatherPending$: weatherPendingSubject$.asObservable(),
      cityWeathers$: cityWeathersSubject$.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [
        MockModule(TableModule),
      ],
      declarations: [
        CitiesComponent,
        MockComponent(CityForecastComponent),
      ],
      providers: [
        { provide: WeatherFacade, useValue: mockedWeatherFacade },
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('ngOnInit', (): void => {
    it('should set cities property', (): void => {
      const mockedCities: Partial<CityWeather>[] = [{ id: 1 }];

      cityWeathersSubject$.next(mockedCities);

      expect(component.cities).toEqual(<CityWeather[]>mockedCities);
    });
  });

  describe('ngOnDestroy', (): void => {
    it('should call cityWeathersSubscription.unsubscribe', (): void => {
      component['cityWeathersSubscription'] = of(1).subscribe();
      component['weathersPendingSubscription'] = null;

      const cityWeathersSubscriptionSpy: jasmine.Spy = spyOn(component['cityWeathersSubscription'], 'unsubscribe');

      fixture.destroy();

      expect(cityWeathersSubscriptionSpy).toHaveBeenCalledTimes(1);
    });

    it('should call weathersPendingSubscription.unsubscribe', (): void => {
      component['cityWeathersSubscription'] = null;
      component['weathersPendingSubscription'] = of().subscribe();
      const weathersPendingSubscriptionSpy: jasmine.Spy = spyOn(component['weathersPendingSubscription'], 'unsubscribe');

      fixture.destroy();

      expect(weathersPendingSubscriptionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('displayCityForecast', (): void => {
    let mockedCoordinates: MapCoordinates;

    beforeEach((): void => {
      mockedCoordinates = { lon: 1, lat: 2 };
    });

    it('should call WeatherFacade.getCityForecast', (): void => {
      component.displayCityForecast(mockedCoordinates);

      expect(mockedWeatherFacade.getCityForecast).toHaveBeenCalledOnceWith(mockedCoordinates);
    });


    it('should set showCityForecast property to true', (): void => {
      component.displayCityForecast(mockedCoordinates);

      weatherPendingSubject$.next(false);

      expect(component.showCityForecast).toBeTruthy();
    });

    it('should set showCityForecast property to false', (): void => {
      component.displayCityForecast(mockedCoordinates);

      weatherPendingSubject$.next(true);

      expect(component.showCityForecast).toBeFalsy();
    });


    it('should call ChangeDetectorRef.markForCheck', (): void => {
      const markForCheckSpy: jasmine.Spy = spyOn(component['changeDetectorRef'], 'markForCheck');
      component.displayCityForecast(mockedCoordinates);

      weatherPendingSubject$.next(true);

      expect(markForCheckSpy).toHaveBeenCalledTimes(1);
    });
  });
});
