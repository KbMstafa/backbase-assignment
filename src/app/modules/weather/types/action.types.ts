import { PendingProps } from '@Models/pending-props.model';
import { TypedActionProps } from '@Types/action.types';

import { CityForecastListProps, CityWeathersProps } from '../models/action-props.model';
import { WeatherActionsTypes } from '../store/weather.actions';

export type SetPendingActionType = TypedActionProps<WeatherActionsTypes.SetPending, PendingProps>;

export type GetCityWeathersSuccessActionType = TypedActionProps<WeatherActionsTypes.GetCityWeathersSuccess, CityWeathersProps>;

export type GetCityForecastSuccessActionType = TypedActionProps<WeatherActionsTypes.GetCityForecastSuccess, CityForecastListProps>;
