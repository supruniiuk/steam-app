import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FriendResponse, User } from 'src/app/shared/interfaces';
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
  subs: Subscription[] = [];
  count: number = 0;
  currentMethod: Function;
  friendsPerPage = 50;

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

  setFriends(res: FriendResponse) {
    this.friends = res.friends;
    this.count = Math.ceil(res.count / this.friendsPerPage);

    this.friends.sort(function (a, b) {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    });
  }

  getFriends(page: number = 1): void {
    const getFriendsSub = this.friendsService
      .getFriends(page)
      .subscribe((res: FriendResponse) => {
        this.setFriends(res);
      });

    this.subs.push(getFriendsSub);
  }

  getPossibleFriends(page: number = 1): void {
    const getPossibleFriendsSub = this.friendsService
      .getAllPossibleFriends(page)
      .subscribe((res: FriendResponse) => {
        this.setFriends(res);
      });

    this.subs.push(getPossibleFriendsSub);
  }

  getSubscriptions(page: number = 1): void {
    const getSubscriptionsSub = this.friendsService
      .getSubscriptions(page)
      .subscribe((res: FriendResponse) => {
        this.setFriends(res);
      });

    this.subs.push(getSubscriptionsSub);
  }

  getFriendsRequests(page: number = 1) {
    const getFriendsRequestsSub = this.friendsService
      .getFriendsRequests(page)
      .subscribe((res: FriendResponse) => {
        this.setFriends(res);
      });

    this.subs.push(getFriendsRequestsSub);
  }

  changeSubPage(id: number) {
    this.subPages[this.activePageId].active = false;
    this.subPages[id].active = true;
    this.activePageId = id;
    this.friends = null;
    this.subPages[id].method();
  }

  changePage(page: number): void {
    this.subPages[this.activePageId].method(page);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
