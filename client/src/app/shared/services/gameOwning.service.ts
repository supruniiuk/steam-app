import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game, GameOwning, GameRequest } from '../newInterfaces';
import { RequestService } from './requests.service';

@Injectable({
  providedIn: 'root',
})
export class GameOwningService {
  ROUTE: string = 'games/owning';
  public error$: Subject<string> = new Subject<string>();

  constructor(private requestService: RequestService) {}

  getAllOwnings(): Observable<string[]> {
    return this.requestService
      .get<string[]>(this.ROUTE)
      .pipe(catchError(this.handleError.bind(this)));
  }

  getAllGame(): Observable<GameOwning[]> {
    return this.requestService
      .get<GameOwning[]>(`${this.ROUTE}/list`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  addGame(id: string): Observable<void> {
    return this.requestService
      .patch<Game>(`${this.ROUTE}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteGame(id: string): Observable<void> {
    return this.requestService
      .delete(`${this.ROUTE}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  handleError(error: HttpErrorResponse) {
    this.error$.next(error.error.error);

    setTimeout(() => {
      this.error$.next('');
    }, 2000);
  }
}
