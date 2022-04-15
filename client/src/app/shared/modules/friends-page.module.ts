import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { FriendsPageComponent } from 'src/app/components/friends-page/friends-page.component';
import { FriendItemComponent } from 'src/app/components/friends-page/friend-item/friend-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: FriendsPageComponent,
      },
    ]),
  ],
  declarations: [FriendsPageComponent, FriendItemComponent],
})
export class FriendsPageModule { }
