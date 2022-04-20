import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Friend, User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
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
  }

  add() {
  }

  remove() {
  }
}
