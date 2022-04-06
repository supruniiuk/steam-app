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
          import('./components/friends-page/friends-page.module').then(
            (m) => m.FriendsPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'games',
        loadChildren: () =>
          import('./components/games-page/games-page.module').then(
            (m) => m.GamesPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'library',
        loadChildren: () =>
          import('./components/library-page/library-page.module').then(
            (m) => m.LibraryPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./components/profile-page/profile-page.module').then(
            (m) => m.ProfilePageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        loadChildren: () =>
          import('./components/games-page/games-page.module').then(
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
