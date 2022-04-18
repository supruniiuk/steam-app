import { NgModule } from '@angular/core';
import {
  NoPreloading,
  RouterModule,
  Routes,
} from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
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
        loadChildren: () =>
          import('./shared/modules/friends-page.module').then(
            (m) => m.FriendsPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'games',
        loadChildren: () =>
          import('./shared/modules/games-page.module').then(
            (m) => m.GamesPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'library',
        loadChildren: () =>
          import('./shared/modules/library-page.module').then(
            (m) => m.LibraryPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./shared/modules/profile-page.module').then(
            (m) => m.ProfilePageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'dev-games',
        loadChildren: () =>
          import('./shared/modules/dev-games.module').then(
            (m) => m.DevGamesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        loadChildren: () =>
          import('./shared/modules/games-page.module').then(
            (m) => m.GamesPageModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NoPreloading,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
