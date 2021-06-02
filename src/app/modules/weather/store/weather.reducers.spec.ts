import { DeepPartial } from '@Types/deep-partial.type';

import { getCityForecastSuccess, getCityWeathersSuccess, setPending } from './weather.actions';
import { WeatherState } from './weather.state';
import { weatherReducer } from './weather.reducers';
import { CityWeather } from '../models/city-weather.model';
import { CityForecast } from '../models/city-forecast.model';

describe('WeatherReducer', (): void => {
  describe('setPending action', (): void => {
    it('should return state with pending updated', (): void => {
      const mockedPending: boolean = false;
      const mockedInitialState: DeepPartial<WeatherState> = { pending: false };

      const action = setPending({ pending: mockedPending });
      const state = weatherReducer(<WeatherState>mockedInitialState, action);

      expect(state).not.toBe(<WeatherState>mockedInitialState);
      expect(state).toEqual({
        ...(<WeatherState>mockedInitialState),
        pending: mockedPending,
      });
    });
  });

  describe('getCityWeathersSuccess action', (): void => {
    it('should return state with cityWeathers updated', (): void => {
      const mockedCityWeathers: Partial<CityWeather> = { id: 1 };
      const mockedInitialState: DeepPartial<WeatherState> = { cityWeathers: [{ id: 2 }] };

      const action = getCityWeathersSuccess({ cityWeathers: <CityWeather[]>[ mockedCityWeathers ] });
      const state = weatherReducer(<WeatherState>mockedInitialState, action);

      expect(state).not.toBe(<WeatherState>mockedInitialState);
      expect(state).toEqual({
        ...(<WeatherState>mockedInitialState),
        cityWeathers: <CityWeather[]>[ mockedCityWeathers ],
      });
    });
  });

  describe('getCityForecastSuccess action', (): void => {
    it('should return state with pending updated', (): void => {
      const mockedCityForecastList: Partial<CityForecast> = { temperature: 1 };
      const mockedInitialState: DeepPartial<WeatherState> = { cityWeathers: [{ temperature: 2 }] };

      const action = getCityForecastSuccess({ cityForecastList: <CityForecast[]>[ mockedCityForecastList ] });
      const state = weatherReducer(<WeatherState>mockedInitialState, action);

      expect(state).not.toBe(<WeatherState>mockedInitialState);
      expect(state).toEqual({
        ...(<WeatherState>mockedInitialState),
        cityForecastList: <CityForecast[]>[ mockedCityForecastList ],
      });
    });
  });
});
