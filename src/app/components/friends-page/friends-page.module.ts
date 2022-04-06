import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FriendItemComponent } from './friend-item/friend-item.component';
import { PipesModule } from 'src/app/shared/modules/pipes.module';
import { FriendsPageComponent } from './friends-page.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: FriendsPageModule,
      },
    ]),
  ],
  declarations: [FriendsPageComponent, FriendItemComponent],
})
export class FriendsPageModule { }
