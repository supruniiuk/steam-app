import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { RequestService } from './shared/services/requests.service';
import { CommonModule } from '@angular/common';
import { ProfilePageModule } from './components/profile-page/profile-page.module';
import { FriendsPageModule } from './components/friends-page/friends-page.module';
import { PipesModule } from './shared/modules/pipes.module';
import { LibraryPageModule } from './components/library-page/library-page.module';
import { GamesPageModule } from './components/games-page/games-page.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, RequestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
