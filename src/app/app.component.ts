import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '@Environment';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'backbase-assignment';

  constructor(
    private readonly translateService: TranslateService,
  ) {
  }

  public ngOnInit(): void {
    this.translateService.setDefaultLang(environment.defaultLang);
  }
}
