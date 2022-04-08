import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Friend, User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.scss'],
})
export class FriendItemComponent implements OnInit {
  user: User;
  isSubmitted: boolean;
  delete: boolean = false;

  @Input() isFriend: boolean = false;
  @Input() friend: Friend | User = null;
  @Output() addFriend = new EventEmitter<Friend>();
  @Output() removeFriend = new EventEmitter<Friend>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  getUserInfo() {
    this.user = this.userService.getCurrentUserInfo();

    if (!this.user.friendsList) {
      this.user.friendsList = [];
    }
  }

  add() {
    this.isSubmitted = false;
    this.getUserInfo();

    const newFriend: Friend = {
      email: this.friend.email,
      id: this.friend.id,
    };

    this.user.friendsList.push(newFriend);
    const updatedUser = {
      ...this.user,
      id: null,
    };

    this.userService.updateUser(updatedUser, this.user.id).subscribe((res) => {
      this.isSubmitted = true;

      const updUser = {
        ...res,
        id: this.user.id,
      };
      localStorage.setItem('userInfo', JSON.stringify(updUser));
      this.addFriend.emit(newFriend);
    });
  }

  remove() {
    this.isSubmitted = false;

    this.getUserInfo();
    const friendsList = this.user.friendsList.filter(
      (f) => f.id != this.friend.id
    );

    const updatedUser = {
      ...this.user,
      id: null,
      friendsList,
    };

    this.userService.updateUser(updatedUser, this.user.id).subscribe((res) => {
      this.isSubmitted = true;
      const updUser = {
        ...res,
        id: this.user.id,
      };
      localStorage.setItem('userInfo', JSON.stringify(updUser));
      this.removeFriend.emit({ email: this.friend.email, id: this.friend.id });
    });
  }
}
