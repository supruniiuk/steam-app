import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { LibraryPageComponent } from 'src/app/modules/library-page/components/library-page/library-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LibraryPageComponent,
      },
    ]),
  ],
  declarations: [LibraryPageComponent ]
})
export class LibraryPageModule {}
