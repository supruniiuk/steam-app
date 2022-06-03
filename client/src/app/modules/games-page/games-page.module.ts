import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { GamesPageComponent } from 'src/app/modules/games-page/components/games-page/games-page.component';
import { GameFilterComponent } from 'src/app/modules/games-page/components/game-filter/game-filter.component';

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
      },
    ]),
  ],
  declarations: [GamesPageComponent, GameFilterComponent],
})
export class GamesPageModule {}
