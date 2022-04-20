import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game, GameOwning, User,  } from '../newInterfaces';
import { RequestService } from './requests.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  ROUTE: string = 'friends';
  public error$: Subject<string> = new Subject<string>();

  constructor(
    private requestService: RequestService
  ) {}

  getAllPossibleFriends(): Observable<User[]> {
    return this.requestService
      .get<User[]>(this.ROUTE)
      .pipe(catchError(this.handleError.bind(this)));
  }
  
  handleError(error: HttpErrorResponse) {
    this.error$.next(error.error.error);

    setTimeout(() => {
      this.error$.next('');
    }, 2000);
  }
}
