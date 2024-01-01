import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faUser as fasUser, faGraduationCap as fasGraduationCap,
  faSuitcase as fasSuitcase, faEnvelope as fasEnvelope, faBars as fasBars
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component'
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    InfoPageComponent,
    ExperienceComponent,
    NotFoundComponent,
    ContactComponent,
    PortfolioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RecaptchaV3Module,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faLinkedinIn, faGithub);
    library.addIcons(fasUser, fasGraduationCap, fasSuitcase, fasEnvelope);
    library.addIcons(fasBars);
  }

}
