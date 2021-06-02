import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';

import { AppRoutes } from '@Enums/routes.enum';
import { ComponentsType, ModulesType } from '@Types/module.types';

import { CitiesComponent } from './components/cities/cities.component';
import { CityForecastComponent } from './components/city-forecast/city-forecast.component';
import { OPEN_WEATHER_INTERCEPTOR_PROVIDER } from './interceptors/open-weather.interceptor';
import { CityWeathersResolver } from './shared/city-weathers.resolver';
import { WeatherRepository } from './shared/weather.repository';
import { WeatherEffects } from './store/weather.effects';
import { WeatherFacade } from './store/weather.facade';
import { weatherReducer } from './store/weather.reducers';
import { WeatherRoutingModule } from './weather-routing.module';

const components: ComponentsType = [
  CitiesComponent,
  CityForecastComponent,
];

const primengModules: ModulesType = [
  TableModule,
  ChartModule,
];

const modules: ModulesType = [
  ...primengModules,
  CommonModule,
  HttpClientModule,
  WeatherRoutingModule,
  TranslateModule.forChild(),
  StoreModule.forFeature(AppRoutes.Weather, weatherReducer),
  EffectsModule.forFeature([WeatherEffects]),
];

const services: Provider[] = [
  WeatherFacade,
  WeatherRepository,
  CityWeathersResolver,
];

const providers: Provider[] = [
  ...services,
  OPEN_WEATHER_INTERCEPTOR_PROVIDER,
];

@NgModule({
  declarations: [ ...components ],
  imports: [ ...modules ],
  providers: [ ...providers ],
})
export class WeatherModule {
}
