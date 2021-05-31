import { ActionReducer, createReducer, on } from '@ngrx/store';

import { getCityWeathersSuccess, setPending } from './weather.actions';
import { WeatherState } from './weather.state';
import { GetCityWeathersSuccessActionType, SetPendingActionType } from '../types/action.types';

export const weatherInitialState: WeatherState = {
  cityWeathers: [],
  pending: false,
};

export const weatherReducer: ActionReducer<WeatherState> = createReducer(
  weatherInitialState,
  on(setPending, (state: WeatherState, action: SetPendingActionType): WeatherState => ({
    ...state,
    pending: action.pending,
  })),
  on(getCityWeathersSuccess, (state: WeatherState, action: GetCityWeathersSuccessActionType): WeatherState => ({
    ...state,
    cityWeathers: action.cityWeathers,
  })),
);
