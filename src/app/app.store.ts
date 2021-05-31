import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';

import { Reducers, State } from '@Models/store.model';

import { weatherInitialState } from './modules/weather/store/weather.reducers';

export const initialState: () => State = (): State => ({
  weather: weatherInitialState,
  shared: {
  },
});

export const reducers: () => Reducers = (): Reducers => ({
  shared: combineReducers({
  }),
});

export const reducerToken: InjectionToken<ActionReducerMap<State>> = new InjectionToken('App Reducers');

export const REDUCER_PROVIDER: Provider = {
  provide: reducerToken,
  useFactory: reducers,
};
