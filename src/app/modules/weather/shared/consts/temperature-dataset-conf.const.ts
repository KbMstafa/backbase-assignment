import { ChartDataSets } from 'chart.js';

import { ForecastAxisIds } from '../enums/forecast-axis-ids.enum';

export const TEMPERATURE_DATASET_CONFIGURATION: ChartDataSets = {
  type: 'bar',
  backgroundColor: '#66BB6A',
  borderColor: 'white',
  borderWidth: 2,
  yAxisID: ForecastAxisIds.Temperature,
};
