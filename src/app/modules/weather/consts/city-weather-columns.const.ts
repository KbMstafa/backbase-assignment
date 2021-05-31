import { TableColumn } from '@Models/table-column.model';

export const CITY_WEATHER_COLUMNS: TableColumn[] = [
  { field: 'name', header: 'WEATHER.FIELDS.CITY_NAME' },
  { field: 'temperature', header: 'WEATHER.FIELDS.TEMPERATURE' },
  { field: 'windSpeed', header: 'WEATHER.FIELDS.WIND_SPEED' },
];
