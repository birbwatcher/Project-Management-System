import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header/header.component';
import { LanguageSwitchComponent } from './core/header/language-switch/language-switch.component';
import { FooterComponent } from './core/footer/footer.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MainPageComponent } from './core/main-page/main-page.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LanguageSwitchComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    MainPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
