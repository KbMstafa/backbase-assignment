import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MapCoordinates } from '@Models/map-coordinates.model';
import { TableColumn } from '@Models/table-column.model';

import { CITY_WEATHER_COLUMNS } from '../../shared/consts/city-weather-columns.const';
import { CityWeather } from '../../shared/models/city-weather.model';
import { WeatherFacade } from '../../store/weather.facade';

@Component({
  selector: 'ba-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesComponent implements OnInit, OnDestroy {
  public cities: CityWeather[] = [];
  public showCityForecast: boolean = false;

  public readonly cityColumns: TableColumn[] = CITY_WEATHER_COLUMNS;

  private cityWeathersSubscription: Subscription | null = null;
  private weathersPendingSubscription: Subscription | null = null;

  constructor(
    private readonly weatherFacade: WeatherFacade,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.cityWeathersSubscription = this.weatherFacade.cityWeathers$
      .subscribe((cityWeathers: CityWeather[]): void => {
        this.cities = cityWeathers;
      });
  }

  public ngOnDestroy(): void {
    this.cityWeathersSubscription?.unsubscribe();
    this.weathersPendingSubscription?.unsubscribe();
  }

  public displayCityForecast(cityCoordinates: MapCoordinates): void {
    this.weatherFacade.getCityForecast(cityCoordinates);

    this.weathersPendingSubscription = this.weatherFacade.weatherPending$
      .subscribe(this.toggleShowCityForecast.bind(this));
  }

  private toggleShowCityForecast(hideCityForecast: boolean): void {
    this.showCityForecast = !hideCityForecast;

    this.changeDetectorRef.markForCheck();
  }
}
