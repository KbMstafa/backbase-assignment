import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableColumn } from '@Models/table-column.model';

import { CITY_WEATHER_COLUMNS } from '../../consts/city-weather-columns.const';
import { CityWeather } from '../../models/city-weather.model';
import { WeatherFacade } from '../../store/weather.facade';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit, OnDestroy {
  public cities: CityWeather[] = [];

  public readonly cityColumns: TableColumn[] = CITY_WEATHER_COLUMNS;

  private cityWeathersSubscription: Subscription | null = null;

  constructor(
    private readonly weatherFacade: WeatherFacade,
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
  }
}
