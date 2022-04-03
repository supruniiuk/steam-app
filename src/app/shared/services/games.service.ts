import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game } from '../interfaces';
import { RequestService } from './requests.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private requestService: RequestService) {}

  getAllGames(): Observable<Game[]> {
    return this.requestService
      .get<Game[]>('games.json')
      .pipe(catchError(this.handleError.bind(this)));
  }

  getGameById(id: string | null): Observable<Game> {
    return this.requestService
      .get<Game>(`games/${id}.json`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  handleError(error: HttpErrorResponse) {
    this.error$.next(error.error.error);

    setTimeout(() => {
      this.error$.next('');
    }, 2000);
  }
}
