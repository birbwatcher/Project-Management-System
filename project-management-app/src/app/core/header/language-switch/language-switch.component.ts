import { Component } from '@angular/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})

export class LanguageSwitchComponent {
   dropdowned = false;
   currentLang = 'EN';

   langSwitch() {
    this.dropdowned = !this.dropdowned;
  }

  switchRu() {
    this.currentLang = 'RU';
    this.langSwitch();
  }

  switchEn() {
    this.currentLang = 'EN';
    this.langSwitch();
  }
}
