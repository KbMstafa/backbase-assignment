import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MultiTranslateLoader } from '@Loaders/multi-translate.loader';
import { ComponentsType, ModulesType } from '@Types/module.types';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
];

@NgModule({
  declarations: [ ...components ],
  imports: [ ...modules ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
