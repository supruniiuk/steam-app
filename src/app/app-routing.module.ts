import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { LoginPageComponent } from './core/components/login-page/components/login-page/login-page.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      {
        path: 'friends',
        loadChildren: () =>
          import('./modules/friends-page/friends-page.module').then(
            (m) => m.FriendsPageModule
          ),
        canActivate: [AuthGuard],
        data: { allowedRoles: ['gamer', 'developer'] },
      },
      {
        path: 'games',
        loadChildren: () =>
          import('./modules/games-page/games-page.module').then(
            (m) => m.GamesPageModule
          ),
        canActivate: [AuthGuard],
        data: { allowedRoles: ['developer', 'admin', 'gamer'] },
      },
      {
        path: 'library',
        loadChildren: () =>
          import('./modules/library-page/library-page.module').then(
            (m) => m.LibraryPageModule
          ),
        canActivate: [AuthGuard],
        data: { allowedRoles: ['gamer'] },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile-page/profile-page.module').then(
            (m) => m.ProfilePageModule
          ),
        canActivate: [AuthGuard],
        data: { allowedRoles: ['developer', 'gamer', 'admin'] },
      },
      {
        path: 'dev-games',
        loadChildren: () =>
          import('./modules/dev-games-page/dev-games.module').then(
            (m) => m.DevGamesModule
          ),
        canActivate: [AuthGuard],
        data: { allowedRoles: ['developer'] },
      },
      {
        path: 'new',
        loadChildren: () =>
          import('./modules/admin-games-page/approve-games.module').then(
            (m) => m.ApproveGamesModule
          ),
        canActivate: [AuthGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: '**',
        loadChildren: () =>
          import('./modules/games-page/games-page.module').then(
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
