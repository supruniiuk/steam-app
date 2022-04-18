import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../pipes/search.pipe';
import { GameFilterPipe } from '../pipes/gameFilter.pipe';
import { LoaderComponent } from '../components/loader/loader.component';
import { AllertComponent } from '../components/allert/allert.component';
import { GameItemComponent } from 'src/app/components/games-page/game-item/game-item.component';
import { GamesListComponent } from '../components/games-list/games-list.component';
import { SearchComponent } from '../components/search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [SearchPipe],
  declarations: [
    SearchPipe,
    GameFilterPipe,
    LoaderComponent,
    AllertComponent,
    GameItemComponent,
    GamesListComponent,
    SearchComponent,
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
  ],
})
export class SharedModule {}
