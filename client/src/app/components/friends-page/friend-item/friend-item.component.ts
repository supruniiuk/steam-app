import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/newInterfaces';
import { FriendsService } from 'src/app/shared/services/friends.service';

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
    this.friendService.approveRequest(this.friend.id).subscribe();
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
