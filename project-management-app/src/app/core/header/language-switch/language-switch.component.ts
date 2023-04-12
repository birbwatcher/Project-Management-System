import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})

export class LanguageSwitchComponent {
  constructor(private translateService: TranslateService) {}

   dropdowned = false;
   currentLang = 'EN';

   langSwitch() {
    this.dropdowned = !this.dropdowned;
  }

  switchRu() {
    this.currentLang = 'RU';
    this.langSwitch();
    this.translateService.use('ru-RU');
  }

  switchEn() {
    this.currentLang = 'EN';
    this.langSwitch();
    this.translateService.use('en-US');
  }
}
