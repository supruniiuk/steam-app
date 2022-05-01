import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DevGamesComponent } from 'src/app/components/dev-games/dev-games.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { CreateGameComponent } from 'src/app/components/dev-games/create-game/create-game.component';
import { AuthGuard } from '../services/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DevGamesComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['developer'] },
      },
    ]),
  ],
  declarations: [DevGamesComponent, CreateGameComponent],
})
export class DevGamesModule {}
