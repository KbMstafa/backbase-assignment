import { Environment } from '@Models/environment.model';

export const environment: Environment = {
  production: false,
  defaultLang: 'en',
  openWeatherApi: {
    key: 'd146c3ff30ee6ff4ec0160059dbebbcc',
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  },
};
