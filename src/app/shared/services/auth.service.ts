import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { FirebaseToken, LoginInfo, ResponseName, User } from '../interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private userService: UserService) {}

  get token(): string | null {
    const expiresIn: any = localStorage.getItem('expiresIn');
    const expDate = new Date(expiresIn);
    if (new Date() > expDate) {
      this.logout();
      return '';
    }
    return localStorage.getItem('token');
  }

  login(user: LoginInfo): Observable<FirebaseToken> {
    user.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  registration(user: LoginInfo): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
        user
      )
      .pipe(
        tap(this.setToken),
        map((response: any) => this.createUser(response)),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
      case 'EMAIL_EXISTS':
        this.error$.next('User with this email already exists');
        break;
    }

    setTimeout(() => {
      this.error$.next('');
    }, 2000);

    return throwError(error);
  }

  private setToken(response: any | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('expiresIn', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private createUser(response: any | null) {
    if (response) {
      const user: User = {
        email: response.email,
        username: '',
        age: null,
        friendsList: [],
        gamesList: [],
      };

      this.userService.createUser(user).subscribe((response: ResponseName) => {
        localStorage.setItem('userId', response.name);
      });
    }
  }
}
