import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageResponse, User } from '../interfaces';
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


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users.json`);
  }

  getUserById(id: string | null): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}.json`);
  }

  updateUser(user, id: string): Observable<MessageResponse> {
    return this.requestService.update(`${this.ROUTE}/${id}`, user);
  }

  deleteProfile(): Observable<MessageResponse> {
    return this.requestService.delete(`${this.ROUTE}`)
  }
}
