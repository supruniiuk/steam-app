import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseName, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.dbURL}/users.json`);
  }

  getUserById(id: string | null): Observable<User> {
    return this.http.get<User>(`${environment.dbURL}/users/${id}.json`);
  }

  createUser(user: User): Observable<ResponseName> {
    return this.http.post<ResponseName>(
      `${environment.dbURL}/users.json`,
      user
    );
  }

  updateUser(user: User, id: string): any {
    return this.http.patch<User>(`${environment.dbURL}/users/${id}.json`, user);
  }
}
