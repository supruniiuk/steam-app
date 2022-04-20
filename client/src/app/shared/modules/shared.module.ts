import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../pipes/search.pipe';
import { GameFilterPipe } from '../pipes/gameFilter.pipe';
import { LoaderComponent } from '../components/loader/loader.component';
import { AllertComponent } from '../components/allert/allert.component';
import { GameItemComponent } from 'src/app/shared/components/game-item/game-item.component';
import { GamesListComponent } from '../components/games-list/games-list.component';
import { SearchComponent } from '../components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateGameComponent } from 'src/app/components/dev-games/update-game/update-game.component';
import { CompleteGameListComponent } from '../components/complete-game-list/complete-game-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [SearchPipe, GameFilterPipe],
  declarations: [
    SearchPipe,
    GameFilterPipe,
    LoaderComponent,
    AllertComponent,
    GameItemComponent,
    GamesListComponent,
    SearchComponent,
    UpdateGameComponent,
    CompleteGameListComponent,
  ],
  exports: [
    CommonModule,
    SearchPipe,
    GameFilterPipe,
    LoaderComponent,
    AllertComponent,
    GameItemComponent,
    GamesListComponent,
    SearchComponent,
    UpdateGameComponent,
    CompleteGameListComponent,
  ],
})
export class SharedModule {}
