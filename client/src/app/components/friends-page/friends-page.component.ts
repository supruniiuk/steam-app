import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/newInterfaces';
import { FriendsService } from 'src/app/shared/services/friends.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
})
export class FriendsPageComponent implements OnInit {
  friends: User[];
  srcStr: string = '';
  requests: boolean = false;
  activePageId: number = 0;

  subPages: Array<{
    title: string;
    active: boolean;
    option: string;
    method: Function;
  }> = [
    {
      title: 'Friends',
      active: true,
      option: 'friends',
      method: this.getFriends.bind(this),
    },
    {
      title: 'My requests',
      active: false,
      option: 'publishers',
      method: this.getSubscriptions.bind(this),
    },
    {
      title: 'Friend requests',
      active: false,
      option: 'subscribers',
      method: this.getFriendsRequests.bind(this),
    },
    {
      title: 'Search friends',
      active: false,
      option: 'search',
      method: this.getPossibleFriends.bind(this),
    },
  ];

  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends(): void {
    this.friendsService.getFriends().subscribe((res) => {
      this.friends = res;
    });
  }

  getPossibleFriends(): void {
    this.friendsService.getAllPossibleFriends().subscribe((res) => {
      this.friends = res;
    });
  }

  getSubscriptions(): void {
    this.friendsService.getSubscriptions().subscribe((res) => {
      this.friends = res;
    });
  }

  getFriendsRequests() {
    this.friendsService.getFriendsRequests().subscribe((res) => {
      this.friends = res;
    });
  }

  changeSubPage(id: number) {
    this.subPages[this.activePageId].active = false;
    this.subPages[id].active = true;
    this.activePageId = id;
    this.friends = null;
    this.subPages[id].method();
  }
}
