import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return '';
  }

  login(user: User) {
    return this.http.post('', user);
  }

  logout() {}

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
