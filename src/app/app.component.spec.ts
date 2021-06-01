import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '@Environment';
import { SpyObject } from '@Types/spy-object.type';

import { AppComponent } from './app.component';

describe('AppComponent', (): void => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockedTranslateService: SpyObject<TranslateService>;

  beforeEach(async (): Promise<void> => {
    mockedTranslateService = jasmine.createSpyObj('TranslateService', [ 'setDefaultLang' ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: TranslateService, useValue: mockedTranslateService },
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('ngOnInit', (): void => {
    it('should call translateService.setDefaultLang', (): void => {
      expect(mockedTranslateService.setDefaultLang).toHaveBeenCalledOnceWith(environment.defaultLang);
    });
  });
});
