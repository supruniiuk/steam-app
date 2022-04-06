import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/modules/pipes.module';
import { RouterModule } from '@angular/router';
import { GamesPageComponent } from './games-page.component';
import { GameFilterComponent } from './game-filter/game-filter.component';
import { GameItemComponent } from './game-item/game-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: GamesPageComponent,
      },
    ]),
  ],
  declarations: [GamesPageComponent, GameFilterComponent, GameItemComponent],
  exports: [GameItemComponent],
})

export class GamesPageModule {}
