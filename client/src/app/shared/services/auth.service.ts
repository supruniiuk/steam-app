import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { LoginInfo, RegisterInfo, Token } from '../newInterfaces';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  public message$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expiresIn: string = localStorage.getItem('expDate');
    const expDate = new Date(expiresIn);
    if (new Date() > expDate) {
      this.logout();
      return '';
    }
    return localStorage.getItem('token');
  }

  login(credentials: LoginInfo): Observable<Token> {
    return this.http
      .post<Token>(`${this.createRoute('users')}/login`, credentials)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  registration(credentials: RegisterInfo): any {
    return this.http
      .post(`${this.createRoute('users')}/registration`, credentials)
      .pipe( tap(this.setMessage), catchError(this.handleError.bind(this)));
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: Token): void {
    if (response) {
      const tokenInfo = AuthService.getTokenInfo(response.jwt_token);
      const expDate = new Date(new Date().getTime() + +tokenInfo.exp * 1000);
      localStorage.setItem('token', response.jwt_token);
      localStorage.setItem('expDate', expDate.toString());
      localStorage.setItem('user', JSON.stringify(tokenInfo));
    } else {
      localStorage.clear();
    }
  }

  setUserInfo(userInfo) {
    localStorage.setItem('user', JSON.stringify(userInfo));
  }

  static getTokenInfo(token: string = localStorage.getItem('token')): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getUserRole() {
    const info = AuthService.getTokenInfo();
    return info.role;
  }

  private createRoute = (route: string) => {
    return `${environment.apiUrl}/${route}`;
  };

  private setMessage(response: any) {
    const message = response.message;

    this.message$.next(message);

    setTimeout(() => {
      this.message$.next('');
    }, 2000);
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error.message;

    this.error$.next(message);

    setTimeout(() => {
      this.error$.next('');
    }, 2000);

    return throwError(error);
  }
}
