import { ActionReducer } from '@ngrx/store';

import { WeatherState } from '@Modules/weather/store/weather.state';

export interface ModuleStates {
  weather: WeatherState;
}

export interface Shared {
}

export interface State extends ModuleStates {
  shared: Shared;
}

export interface Reducers {
  shared: ActionReducer<Shared>;
}
