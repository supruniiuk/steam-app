import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game, GameRequest } from '../newInterfaces';
import { RequestService } from './requests.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  ROUTE: string = 'games';
  public error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    private requestService: RequestService
  ) {}

  getAllGames(): Observable<Game[]> {
    return this.requestService
      .get<Game[]>(this.ROUTE)
      .pipe(catchError(this.handleError.bind(this)));
  }

  getGameById(id: string | null): Observable<Game> {
    return this.requestService
      .get<Game>(`games/${id}.json`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  createGame(game: GameRequest): Observable<Game> {
    return this.requestService
      .create<Game>(this.ROUTE, game)
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
