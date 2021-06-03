import { State } from '@Models/store.model';
import { DeepPartial } from '@Types/deep-partial.type';

import { CityForecast } from '../shared/models/city-forecast.model';
import { CityWeather } from '../shared/models/city-weather.model';

import { weatherSelectors } from './weather.selectors';

describe('weatherSelectors', (): void => {
  let state: DeepPartial<State>;

  describe('selectCityForecastList', (): void => {
    it('should return weather state city forecast', (): void => {
      const mockedCityForecast: Partial<CityForecast> = { time: 'time' };
      state = { weather: { cityForecastList: [ mockedCityForecast ] } };

      const cityForecastList: CityForecast[] = weatherSelectors.selectCityForecastList(<State>state);

      expect(cityForecastList).toEqual(<CityForecast[]>[ mockedCityForecast ]);
    });
  });

  describe('selectCityWeathers', (): void => {
    it('should return weather state city weathers', (): void => {
      const mockedCityWeathers: Partial<CityWeather> = { id: 1 };
      state = { weather: { cityWeathers: [ mockedCityWeathers ] } };

      const cityWeathers: CityWeather[] = weatherSelectors.selectCityWeathers(<State>state);

      expect(cityWeathers).toEqual(<CityWeather[]>[ mockedCityWeathers ]);
    });
  });

  describe('selectWeatherPending', (): void => {
    it('should return weather state pending', (): void => {
      const mockedPending: boolean = true;
      state = { weather: { pending: mockedPending } };

      const pending: boolean = weatherSelectors.selectWeatherPending(<State>state);

      expect(pending).toEqual(mockedPending);
    });
  });
});
