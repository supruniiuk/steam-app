import { Component, OnInit } from '@angular/core';
import { Friend, User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss'],
})
export class FriendsPageComponent implements OnInit {
  public users: User[] = [];
  errorMessage: string = '';
  srcStr: string = '';
  user: User;
  friendsList: Friend[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUserInfo();

    if (this.user.friendsList && this.user.friendsList.length > 0) {
      this.friendsList = this.user.friendsList;
    } else {
      this.friendsList = [];
    }

    this.userService.getAllUsers().subscribe(
      (res) => {
        this.users = Object.keys(res).map((key: any) => {
          res[key].id = key;
          return res[key];
        });

        this.filterUsers();
      },
      (err) => {
        this.errorMessage = err.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }

  filterUsers() {
    const friends = this.friendsList.map((f) => f.id);
    this.users = this.users.filter(
      (u) => u.email !== this.user.email && !friends.includes(u.id)
    );
  }

  remove(exFriend: Friend) {
    this.friendsList = this.friendsList.filter((f) => f.id != exFriend.id);
  }

  add(newFriend: Friend) {
    this.friendsList.unshift(newFriend);
  }
}
