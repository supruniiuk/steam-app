import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
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
    const expiresIn: string = localStorage.getItem('expiresIn');
    const expDate = new Date(expiresIn);
    if (new Date() > expDate) {
      this.logout();
      return '';
    }
    return localStorage.getItem('token');
  }

  login(data: LoginInfo): Observable<FirebaseToken> {
    const user = {
      ...data,
      returnSecureToken: true,
    };
    return this.http
      .post(`${environment.loginURL + environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        map((response: FirebaseToken) => this.setUserId(response)),
        catchError(this.handleError.bind(this))
      );
  }

  registration(data: LoginInfo): Observable<FirebaseToken> {
    const user = {
      ...data,
      returnSecureToken: true,
    };
    return this.http
      .post(`${environment.registrationURL + environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        map((response: FirebaseToken) => this.createUser(response)),
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
        this.error$.next('User with this email not found');
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

  private setToken(response: FirebaseToken): void {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('email', response.email);
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('expiresIn', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private createUser(response: FirebaseToken) {
    if (response) {
      const user: User = {
        email: response.email,
        username: '',
        age: null,
        friendsList: [],
        gamesList: [],
      };

      this.userService.createUser(user).subscribe((res: ResponseName) => {
        this.setUserId({ email: user.email });
      });
    }
  }

  private setUserId(response: FirebaseToken | User): void {
    this.userService.getAllUsers().subscribe((res: User[]) => {
      const users = Object.keys(res).map((key: any) => {
        res[key].id = key;
        return res[key];
      });

      const userInfo: User = users.filter(
        (u: User) => u.email == response.email
      )[0];

      this.userService.setCurrentUserInfo(userInfo);
    });
  }
}
