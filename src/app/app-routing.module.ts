import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FriendsPageComponent } from './components/friends-page/friends-page.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LibraryPageComponent } from './components/library-page/library-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: LoginPageComponent },
      {
        path: 'friends',
        component: FriendsPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'games',
        component: GamesPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'library',
        component: LibraryPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', component: GamesPageComponent, canActivate: [AuthGuard] },
    ],
  },
  // lazy-loading
  // очистка подписок
  // методы rxjs
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
