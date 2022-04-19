import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { LibraryPageComponent } from 'src/app/components/library-page/library-page.component';
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
        component: LibraryPageModule,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['gamer'] },
      },
    ]),
  ],
  declarations: [LibraryPageComponent ]
})
export class LibraryPageModule {}
