import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

import { CityForecast } from '@Modules/weather/models/city-forecast.model';
import { WeatherFacade } from '@Modules/weather/store/weather.facade';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'ba-city-forecast',
  templateUrl: './city-forecast.component.html',
  styleUrls: ['./city-forecast.component.scss']
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
      labels.push(moment(cityForecast.dateTime).format('HH:mm A'));
      temperatureData.push(cityForecast.temperature);
      windSpeedData.push(cityForecast.windSpeed);
    });

    this.cityForecastData = {
      labels,
      datasets: [
        {
          type: 'line',
          label: this.translateService.instant('WEATHER.FORECAST.WIND_SPEED'),
          borderColor: '#42A5F5',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#42A5F5',
          fill: false,
          data: windSpeedData,
          yAxisID: 'wind-speed',
        },
        {
          type: 'bar',
          label: this.translateService.instant('WEATHER.FORECAST.TEMPERATURE'),
          backgroundColor: '#66BB6A',
          data: temperatureData,
          borderColor: 'white',
          borderWidth: 2,
          yAxisID: 'temperature',
        },
      ]
    };
  }

  private setCityForecastOptions(): void {
    this.cityForecastOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'Forecast',
        fontSize: 25,
      },
      legend: {
        labels: { fontColor: 'rgba(255, 255, 255, 0.6)' }
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.translateService.instant('WEATHER.FORECAST.TIME'),
          },
          ticks: { fontColor: 'rgba(255, 255, 255, 0.87)' },
          gridLines: { color: 'rgba(255, 255, 255, 0.6)' }
        }],
        yAxes: [
          {
            id: 'temperature',
            display: true,
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: this.translateService.instant('WEATHER.FORECAST.TEMPERATURE'),
            },
            ticks: { fontColor: 'rgba(255, 255, 255, 0.87)' },
            gridLines: { color: 'rgba(255, 255, 255, 0.6)' },
          },
          {
            id: 'wind-speed',
            display: 'auto',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: this.translateService.instant('WEATHER.FORECAST.WIND_SPEED'),
            },
            ticks: { showLabelBackdrop: false, fontColor: 'rgba(255, 255, 255, 0.87)' },
            gridLines: { display: false },
          },
        ],
      }
    };
  }
}
