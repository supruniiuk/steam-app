import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FriendResponse, MessageResponse, User } from '../interfaces';
import { RequestService } from './requests.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  ROUTE: string = 'friends';
  public error$: Subject<string> = new Subject<string>();

  constructor(private requestService: RequestService) {}

  getFriends(): Observable<FriendResponse> {
    return this.requestService
    .get<User[]>(this.ROUTE)
    .pipe(catchError(this.handleError.bind(this)));
  }

  getAllPossibleFriends(): Observable<FriendResponse> {
    return this.requestService
      .get<User[]>(this.ROUTE + '/search')
      .pipe(catchError(this.handleError.bind(this)));
  }

  getSubscriptions(): Observable<FriendResponse> {
    return this.requestService
      .get<User[]>(this.ROUTE + '/subs')
      .pipe(catchError(this.handleError.bind(this)));
  }

  getFriendsRequests(): Observable<FriendResponse> {
    return this.requestService
      .get<User[]>(this.ROUTE + '/new')
      .pipe(catchError(this.handleError.bind(this)));
  }

  addFriend(publisherId: string): Observable<MessageResponse> {
    return this.requestService
      .create<MessageResponse[]>(this.ROUTE, { publisherId })
      .pipe(catchError(this.handleError.bind(this)));
  }

  approveRequest(id: string): Observable<MessageResponse> {
    return this.requestService
    .patch<MessageResponse[]>(this.ROUTE + `/${id}`)
    .pipe(catchError(this.handleError.bind(this)));
  }

  deleteFriend(publisherId: string): Observable<MessageResponse> {
    return this.requestService
      .delete<MessageResponse[]>(`${this.ROUTE}/${publisherId}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  handleError(error: HttpErrorResponse) {
    this.error$.next(error.error.error);

    setTimeout(() => {
      this.error$.next('');
    }, 2000);
  }
}
