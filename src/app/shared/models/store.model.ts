import { ActionReducer } from '@ngrx/store';

export interface Shared {
}

export interface State {
  shared: Shared;
}

export interface Reducers {
  shared: ActionReducer<Shared>;
}
