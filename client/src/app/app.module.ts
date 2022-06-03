import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './core/components/login-page/components/login-page/login-page.component';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from './core/services/requests.service';
import { CommonModule } from '@angular/common';
import { SignInFormComponent } from './core/components/login-page/components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './core/components/login-page/components/sign-up-form/sign-up-form.component';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    SignInFormComponent,
    SignUpFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [RequestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
