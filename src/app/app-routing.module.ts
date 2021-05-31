import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Module } from '@Types/module.types';

import { AppRoutes, GeneralRoutes } from './shared/enums/routes.enum';

const routes: Routes = [
  {
    path: GeneralRoutes.Root,
    pathMatch: 'full',
    redirectTo: AppRoutes.Weather,
  },
  {
    path: AppRoutes.Weather,
    loadChildren: (): Promise<Module> => import('./modules/weather/weather.module')
      .then((module: Module): Module => module.WeatherModule),
  },
  {
    path: GeneralRoutes.Wild,
    redirectTo: AppRoutes.Weather,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
