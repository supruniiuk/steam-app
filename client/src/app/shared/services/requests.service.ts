import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public error$: Subject<string> = new Subject<string>();
  public message$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  public get<T>(route: string): Observable<T> {
    return this.http
      .get<T>(this.createRoute(route), {
        headers: this.generateHeaders(),
      })
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(this.setMessage.bind(this))
      );
  }

  public create<T>(route: string, body: any): Observable<T> {
    return this.http
      .post<T>(this.createRoute(route), body, {
        headers: this.generateHeaders(),
      })
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(this.setMessage.bind(this))
      );
  }

  public update<T>(route: string, body: any): Observable<T> {
    return this.http
      .put<T>(this.createRoute(route), body, {
        headers: this.generateHeaders(),
      })
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(this.setMessage.bind(this))
      );
  }

  public patch<T>(route: string): Observable<T> {
    return this.http
      .patch(this.createRoute(route), null, {
        headers: this.generateHeaders(),
      })
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(this.setMessage.bind(this))
      );
  }

  public delete<T>(route: string): Observable<T> {
    return this.http
      .delete(this.createRoute(route), {
        headers: this.generateHeaders(),
      })
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(this.setMessage.bind(this))
      );
  }

  private createRoute = (route: string) => {
    return `${environment.apiUrl}/${route}`;
  };

  private generateHeaders(): HttpHeaders {
    const token = 'Bearer ' + this.authService.token;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
  }

  private setMessage(response: any) {
    const message = response.message;

    if (message) {
      this.message$.next(message);
    }

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
