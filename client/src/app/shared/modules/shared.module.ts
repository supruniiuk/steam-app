import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../pipes/search.pipe';
import { GameFilterPipe } from '../pipes/gameFilter.pipe';
import { LoaderComponent } from '../loader/loader.component';

@NgModule({
  declarations: [SearchPipe, GameFilterPipe, LoaderComponent],
  exports: [CommonModule, SearchPipe, GameFilterPipe, LoaderComponent],
})
export class SharedModule {}
