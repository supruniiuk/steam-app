import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { FriendsPageComponent } from './components/friends-page/friends-page.component';
import { LibraryPageComponent } from './components/library-page/library-page.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FriendItemComponent } from './components/friends-page/friend-item/friend-item.component';
import { GameItemComponent } from './components/games-page/game-item/game-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { SearchPipe } from './shared/pipes/search.pipe';
import { GameFilterPipe } from './shared/pipes/price-filter.pipe';
import { LoaderComponent } from './shared/loader/loader.component';
import { RequestService } from './shared/services/requests.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProfilePageComponent,
    FriendsPageComponent,
    LibraryPageComponent,
    GamesPageComponent,
    HomePageComponent,
    FriendItemComponent,
    GameItemComponent,
    SearchPipe,
    GameFilterPipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, UserService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
