import { createAction, props } from '@ngrx/store';

import { PendingProps } from '@Models/pending-props.model';
import { ActionCreatorPropsType } from '@Types/action.types';

import {
  CityIdsProps,
  CityWeathersProps,
  CityCoordinatesProps,
  CityForecastListProps,
} from '../shared/models/action-props.model';

export enum WeatherActionsTypes {
  SetPending = '[Weather] SET_PENDING',

  GetCityWeathers = '[Weather] GET_CITY_WEATHERS',
  GetCityWeathersSuccess = '[Weather] GET_CITY_WEATHERS_SUCCESS',

  GetCityForecast = '[Weather] GET_CITY_FORECAST',
  GetCityForecastSuccess = '[Weather] GET_CITY_FORECAST_SUCCESS',
}

export const setPending: ActionCreatorPropsType<WeatherActionsTypes.SetPending, PendingProps> = createAction(WeatherActionsTypes.SetPending, props<PendingProps>());

export const getCityWeathers: ActionCreatorPropsType<WeatherActionsTypes.GetCityWeathers, CityIdsProps> = createAction(WeatherActionsTypes.GetCityWeathers, props<CityIdsProps>());
export const getCityWeathersSuccess: ActionCreatorPropsType<WeatherActionsTypes.GetCityWeathersSuccess, CityWeathersProps> = createAction(WeatherActionsTypes.GetCityWeathersSuccess, props<CityWeathersProps>());

export const getCityForecast: ActionCreatorPropsType<WeatherActionsTypes.GetCityForecast, CityCoordinatesProps> = createAction(WeatherActionsTypes.GetCityForecast, props<CityCoordinatesProps>());
export const getCityForecastSuccess: ActionCreatorPropsType<WeatherActionsTypes.GetCityForecastSuccess, CityForecastListProps> = createAction(WeatherActionsTypes.GetCityForecastSuccess, props<CityForecastListProps>());
