interface ForecastResponseHourlyWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ForecastResponseHourly {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: ForecastResponseHourlyWeather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface ForecastResponse {
  hourly: ForecastResponseHourly[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}
