import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { ApproveGamesComponent } from 'src/app/components/approve-games/approve-games.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ApproveGamesComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['admin'] },
      },
    ]),
  ],
  declarations: [ApproveGamesComponent],
})
export class ApproveGamesModule { }
