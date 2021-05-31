import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MultiTranslateLoader } from '@Loaders/multi-translate.loader';
import { ComponentsType, ModulesType } from '@Types/module.types';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initialState, reducerToken, REDUCER_PROVIDER } from './app.store';

const components: ComponentsType = [
  AppComponent,
];

const modules: ModulesType = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useClass: MultiTranslateLoader,
      deps: [HttpClient],
    },
  }),
  StoreModule.forRoot(reducerToken, { initialState }),
  EffectsModule.forRoot(),
];

const providers: Provider[] = [
  REDUCER_PROVIDER,
];

@NgModule({
  declarations: [ ...components ],
  imports: [ ...modules ],
  providers: [ ...providers ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
