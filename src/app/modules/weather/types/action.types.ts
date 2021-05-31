import { PendingProps } from '@Models/pending-props.model';
import { TypedActionProps } from '@Types/action.types';

import { CityWeathersProps } from '../models/action-props.model';
import { WeatherActionsTypes } from '../store/weather.actions';

export type SetPendingActionType = TypedActionProps<WeatherActionsTypes.SetPending, PendingProps>;

export type GetCityWeathersSuccessActionType = TypedActionProps<WeatherActionsTypes.GetCityWeathersSuccess, CityWeathersProps>;
