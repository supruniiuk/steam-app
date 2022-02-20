import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game, ResponseName, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.dbURL}/games.json`);
  }

  getGameById(id: string | null): Observable<Game> {
    return this.http.get<Game>(`${environment.dbURL}/games/${id}.json`);
  }
}
