import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '@Environment';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  constructor(
    private readonly title: Title,
    private readonly translateService: TranslateService,
  ) {
  }

  public ngOnInit(): void {
    this.title.setTitle('Backbase Assignment');
    this.translateService.setDefaultLang(environment.defaultLang);
  }
}
