import { ChartOptions } from 'chart.js';

import { ForecastAxisIds } from '../enums/forecast-axis-ids.enum';

import { getCityForecastOptions } from './get-forecast-options.util';

describe('getCityForecastOptions', (): void => {
  it('should return forecast options with default label', (): void => {
    const cityForecastOptions: ChartOptions = getCityForecastOptions();

    expect(cityForecastOptions).toEqual({
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
            labelString: 'Time',
          },
          ticks: { fontColor: 'rgba(255, 255, 255, 0.87)' },
          gridLines: { color: 'rgba(255, 255, 255, 0.6)' }
        }],
        yAxes: [
          {
            id: ForecastAxisIds.Temperature,
            display: true,
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Temperature',
            },
            ticks: { fontColor: 'rgba(255, 255, 255, 0.87)' },
            gridLines: { color: 'rgba(255, 255, 255, 0.6)' },
          },
          {
            id: ForecastAxisIds.WindSpeed,
            display: 'auto',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: 'Wind Speed',
            },
            ticks: { showLabelBackdrop: false, fontColor: 'rgba(255, 255, 255, 0.87)' },
            gridLines: { display: false },
          },
        ],
      }
    });
  });

  it('should return forecast options with given label', (): void => {
    const mockedTimeLabel: string = 'Time Label';
    const mockedTemperatureLabel: string = 'Temperature Label';
    const mockedWinSpeedLabel: string = 'Wind Speed Label';

    const cityForecastOptions: ChartOptions = getCityForecastOptions(
      mockedTimeLabel,
      mockedTemperatureLabel,
      mockedWinSpeedLabel,
    );

    expect(cityForecastOptions).toEqual({
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
            labelString: mockedTimeLabel,
          },
          ticks: { fontColor: 'rgba(255, 255, 255, 0.87)' },
          gridLines: { color: 'rgba(255, 255, 255, 0.6)' }
        }],
        yAxes: [
          {
            id: ForecastAxisIds.Temperature,
            display: true,
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: mockedTemperatureLabel,
            },
            ticks: { fontColor: 'rgba(255, 255, 255, 0.87)' },
            gridLines: { color: 'rgba(255, 255, 255, 0.6)' },
          },
          {
            id: ForecastAxisIds.WindSpeed,
            display: 'auto',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: mockedWinSpeedLabel,
            },
            ticks: { showLabelBackdrop: false, fontColor: 'rgba(255, 255, 255, 0.87)' },
            gridLines: { display: false },
          },
        ],
      }
    });
  });
});
