import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { GamesPageComponent } from 'src/app/components/games-page/games-page.component';
import { GameFilterComponent } from 'src/app/components/games-page/game-filter/game-filter.component';
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
        component: GamesPageComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['developer', 'admin', 'gamer'] },
      },
    ]),
  ],
  declarations: [GamesPageComponent, GameFilterComponent],
})
export class GamesPageModule {}
