import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DevGamesComponent } from 'src/app/modules/dev-games-page/components/dev-games/dev-games.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';
import { CreateGameComponent } from 'src/app/modules/dev-games-page/components/create-game/create-game.component';

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
      },
    ]),
  ],
  declarations: [DevGamesComponent, CreateGameComponent],
})
export class DevGamesModule {}
