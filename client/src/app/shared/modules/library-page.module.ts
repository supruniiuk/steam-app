import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { GamesPageModule } from './games-page.module';
import { LibraryPageComponent } from 'src/app/components/library-page/library-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    GamesPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: LibraryPageModule,
      },
    ]),
  ],
  declarations: [LibraryPageComponent ]
})
export class LibraryPageModule {}
