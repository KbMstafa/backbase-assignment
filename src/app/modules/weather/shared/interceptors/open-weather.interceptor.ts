import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@Environment';
import { OpenWeatherUnits } from '@Enums/open-weather-units.enum';

@Injectable()
export class OpenWeatherInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const openWeatherRequest: HttpRequest<any> = request.clone({
      setParams: {
        appid: environment.openWeatherApi.key,
        units: OpenWeatherUnits.Metric,
      },
    });

    return next.handle(openWeatherRequest);
  }
}

export const OPEN_WEATHER_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: OpenWeatherInterceptor,
  multi: true,
};
