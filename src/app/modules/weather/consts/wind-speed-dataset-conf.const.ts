import { ChartDataSets } from 'chart.js';

import { ForecastAxisIds } from '../enums/forecast-axis-ids.enum';

export const WIND_SPEED_DATASET_CONFIGURATION: ChartDataSets = {
  type: 'line',
  borderColor: '#42A5F5',
  borderWidth: 2,
  pointRadius: 4,
  pointBackgroundColor: '#42A5F5',
  fill: true,
  yAxisID: ForecastAxisIds.WindSpeed,
};
