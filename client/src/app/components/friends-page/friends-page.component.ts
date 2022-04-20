import { Component, OnInit } from '@angular/core';
import { Friend, User } from 'src/app/shared/interfaces';
import { FriendsService } from 'src/app/shared/services/friends.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html'
})
export class FriendsPageComponent implements OnInit {
  possibleFriends: User[] = [];
  srcStr: string = '';
  requests: boolean = true;

  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.friendsService.getAllPossibleFriends().subscribe((res) => {
      this.possibleFriends = res
      console.log(this.possibleFriends)
    })
  }
}
