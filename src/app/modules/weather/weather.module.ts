import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';

import { ComponentsType, ModulesType } from '@Types/module.types';

import { WeatherRoutingModule } from './weather-routing.module';

const components: ComponentsType = [
];

const modules: ModulesType = [
  CommonModule,
  WeatherRoutingModule,
];

@NgModule({
  declarations: [ ...components ],
  imports: [ ...modules ],
})
export class WeatherModule { }
