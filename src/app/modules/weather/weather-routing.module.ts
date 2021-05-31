import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralRoutes } from '@Enums/routes.enum';

import { CitiesComponent } from './components/cities/cities.component';
import { CityWeathersResolver } from './shared/city-weathers.resolver';

const routes: Routes = [
  {
    path: GeneralRoutes.Root,
    component: CitiesComponent,
    resolve: [ CityWeathersResolver ],
  },
  {
    path: GeneralRoutes.Wild,
    redirectTo: GeneralRoutes.Root,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule {
}
