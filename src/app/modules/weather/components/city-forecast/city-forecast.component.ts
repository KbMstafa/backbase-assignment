import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TEMPERATURE_DATASET_CONFIGURATION } from '../../shared/consts/temperature-dataset-conf.const';
import { WIND_SPEED_DATASET_CONFIGURATION } from '../../shared/consts/wind-speed-dataset-conf.const';
import { CityForecast } from '../../shared/models/city-forecast.model';
import { getCityForecastOptions } from '../../shared/utils/get-forecast-options.util';
import { WeatherFacade } from '../../store/weather.facade';

@Component({
  selector: 'ba-city-forecast',
  templateUrl: './city-forecast.component.html',
  styleUrls: ['./city-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityForecastComponent implements OnInit, OnDestroy {
  public cityForecastData: ChartData = {};
  public cityForecastOptions: ChartOptions = {};

  private cityForecastSubscription: Subscription | null = null;

  constructor(
    private readonly weatherFacade: WeatherFacade,
    private readonly translateService: TranslateService,
  ) {
  }

  public ngOnInit(): void {
    this.setCityForecastOptions();

    this.cityForecastSubscription = this.weatherFacade.cityForecastList$
      .pipe(tap(this.resetCityForecastData.bind(this)))
      .subscribe(this.setCityForecastData.bind(this));
  }

  public ngOnDestroy(): void {
    this.cityForecastSubscription?.unsubscribe();
  }

  private resetCityForecastData(): void {
    this.cityForecastData = {};
  }

  private setCityForecastData(cityForecastList: CityForecast[]): void {
    const labels: string[] = [];
    const temperatureData: number[] = [];
    const windSpeedData: number[] = [];

    cityForecastList.forEach((cityForecast: CityForecast): void => {
      labels.push(cityForecast.time);
      temperatureData.push(cityForecast.temperature);
      windSpeedData.push(cityForecast.windSpeed);
    });

    this.cityForecastData = {
      labels,
      datasets: [
        {
          ...WIND_SPEED_DATASET_CONFIGURATION,
          label: this.translateService.instant('WEATHER.FORECAST.WIND_SPEED'),
          data: windSpeedData,
        },
        {
          ...TEMPERATURE_DATASET_CONFIGURATION,
          label: this.translateService.instant('WEATHER.FORECAST.TEMPERATURE'),
          data: temperatureData,
        },
      ]
    };
  }

  private setCityForecastOptions(): void {
    this.cityForecastOptions = getCityForecastOptions(
      this.translateService.instant('WEATHER.FORECAST.TIME'),
      this.translateService.instant('WEATHER.FORECAST.TEMPERATURE'),
      this.translateService.instant('WEATHER.FORECAST.WIND_SPEED'),
    );
  }
}
