import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePageComponent } from '../../components/profile-page/profile-page.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AuthGuard } from '../services/auth.guard';
import { ConfirmationComponent } from 'src/app/components/profile-page/confirmation/confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfilePageComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['developer', 'gamer', 'admin'] },
      },
    ]),
  ],
  declarations: [ProfilePageComponent, ConfirmationComponent],
})
export class ProfilePageModule {}
