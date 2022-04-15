import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePageComponent } from '../../components/profile-page/profile-page.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

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
      },
    ]),
  ],
  declarations: [ProfilePageComponent]
})
export class ProfilePageModule {}
