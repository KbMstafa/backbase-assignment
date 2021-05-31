import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface TranslateResourceInterface {
  prefix: string;
  suffix: string;
}

export class MultiTranslateLoader implements TranslateLoader {

  private readonly translationFiles: string[] = [
    'app',
  ];

  public constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getTranslation(lang: string): Observable<object> {
    const basePath: string = `./assets/i18n`;
    const resources: TranslateResourceInterface[] = this.translationFiles
      .map((translationFile: string): TranslateResourceInterface => ({
        prefix: `${basePath}/${translationFile}/`,
        suffix: '.json',
      }));
    const languages: Observable<object[]>[] = resources
      .map((config: TranslateResourceInterface): Observable<object[]> => (
        this.http.get<object[]>(`${config.prefix}${lang}${config.suffix}`)
      ));

    return forkJoin(languages)
      .pipe(
        map((response: object[]): object => (
          response.reduce((sum: object, nextPart: object): object => ({ ...sum, ...nextPart }))
        )),
      );
  }
}
