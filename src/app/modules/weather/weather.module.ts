import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TableModule } from 'primeng/table';

import { AppRoutes } from '@Enums/routes.enum';
import { ComponentsType, ModulesType } from '@Types/module.types';

import { CitiesComponent } from './components/cities/cities.component';
import { WeatherRepository } from './shared/weather.repository';
import { WeatherEffects } from './store/weather.effects';
import { WeatherFacade } from './store/weather.facade';
import { weatherReducer } from './store/weather.reducers';
import { WeatherRoutingModule } from './weather-routing.module';
import { CityWeathersResolver } from './shared/city-weathers.resolver';

const components: ComponentsType = [
  CitiesComponent,
];

const primengModules: ModulesType = [
  TableModule,
];

const modules: ModulesType = [
  ...primengModules,
  CommonModule,
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
];

@NgModule({
  declarations: [ ...components ],
  imports: [ ...modules ],
  providers: [ ...providers ],
})
export class WeatherModule {
}
