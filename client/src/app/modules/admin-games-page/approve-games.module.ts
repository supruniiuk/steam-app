import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { ApproveGamesComponent } from 'src/app/modules/admin-games-page/approve-games/approve-games.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ApproveGamesComponent,
      },
    ]),
  ],
  declarations: [ApproveGamesComponent],
})
export class ApproveGamesModule { }
