import { createAction, props } from '@ngrx/store';

import { PendingProps } from '@Models/pending-props.model';
import { ActionCreatorPropsType } from '@Types/action.types';

import { CityIdsProps, CityWeathersProps } from '../models/action-props.model';

export enum WeatherActionsTypes {
  SetPending = '[Weather] SET_PENDING',

  GetCityWeathers = '[Weather] GET_CITY_WEATHERS',
  GetCityWeathersSuccess = '[Weather] GET_CITY_WEATHERS_SUCCESS',
}

export const setPending: ActionCreatorPropsType<WeatherActionsTypes.SetPending, PendingProps> = createAction(WeatherActionsTypes.SetPending, props<PendingProps>());

export const getCityWeathers: ActionCreatorPropsType<WeatherActionsTypes.GetCityWeathers, CityIdsProps> = createAction(WeatherActionsTypes.GetCityWeathers, props<CityIdsProps>());
export const getCityWeathersSuccess: ActionCreatorPropsType<WeatherActionsTypes.GetCityWeathersSuccess, CityWeathersProps> = createAction(WeatherActionsTypes.GetCityWeathersSuccess, props<CityWeathersProps>());
