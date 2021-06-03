import { ChartOptions } from 'chart.js';

import { ForecastAxisIds } from '../enums/forecast-axis-ids.enum';

export function getCityForecastOptions(
  timeLabel: string = 'Time',
  temperatureLabel: string = 'Temperature',
  windSpeedLabel: string = 'Wind Speed',
): ChartOptions {
  return {
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
          labelString: timeLabel,
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
            labelString: temperatureLabel,
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
            labelString: windSpeedLabel,
          },
          ticks: { showLabelBackdrop: false, fontColor: 'rgba(255, 255, 255, 0.87)' },
          gridLines: { display: false },
        },
      ],
    }
  };
}