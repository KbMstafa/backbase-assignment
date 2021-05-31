interface OpenWeatherApi {
  key: string;
  baseUrl: string;
}

export interface Environment {
  production: boolean;
  defaultLang: string;
  openWeatherApi: OpenWeatherApi;
}
