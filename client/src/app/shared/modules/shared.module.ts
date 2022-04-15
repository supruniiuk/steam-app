import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../pipes/search.pipe';
import { GameFilterPipe } from '../pipes/gameFilter.pipe';
import { LoaderComponent } from '../components/loader/loader.component';
import { AllertComponent } from '../components/allert/allert.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SearchPipe, GameFilterPipe, LoaderComponent, AllertComponent],
  exports: [CommonModule, SearchPipe, GameFilterPipe, LoaderComponent, AllertComponent],
})
export class SharedModule {}
