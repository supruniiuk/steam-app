import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { FriendsService } from 'src/app/core/services/friends.service';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
})
export class FriendItemComponent implements OnInit {
  isRequestSend: boolean = false;
  isSubmitted: boolean = false;
  subs: Subscription[] = [];

  @Input() friend: User = null;
  @Input() option: string = 'friends';

  constructor(private friendService: FriendsService) {}

  ngOnInit(): void {}

  addFriend() {
    this.isRequestSend = true;
    const addFriendSubscription = this.friendService
      .addFriend(this.friend.id)
      .subscribe();

    this.subs.push(addFriendSubscription);
  }

  approveRequest() {
    this.isSubmitted = true;
    const approveRequest = this.friendService
      .approveRequest(this.friend.id)
      .subscribe();
    this.subs.push(approveRequest);
  }

  cancelRequest() {
    this.isRequestSend = false;
    this.isSubmitted = true;
    const cancelSubscription = this.friendService
      .deleteFriend(this.friend.id)
      .subscribe();

    this.subs.push(cancelSubscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
