import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseName, User } from '../interfaces';
import { MessageResponse } from '../newInterfaces';
import { RequestService } from './requests.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  ROUTE: string = 'users';

  constructor(
    private http: HttpClient,
    private requestService: RequestService
  ) {}

  getCurrentUserInfo(): User {
    const userInfo: string | null = localStorage.getItem('userInfo');
    const user = JSON.parse(userInfo ? userInfo : '');
    return user;
  }

  setCurrentUserInfo(user: User): void {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users.json`);
  }

  getUserById(id: string | null): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}.json`);
  }

  createUser(user: User): Observable<ResponseName> {
    return this.http.post<ResponseName>(
      `${environment.apiUrl}/users.json`,
      user
    );
  }

  updateUser(user: User, id: string): Observable<MessageResponse> {
    return this.requestService.update(`${this.ROUTE}/${id}`, user);
  }

  deleteProfile(): Observable<MessageResponse> {
    return this.requestService.delete(`${this.ROUTE}`)
  }
}
