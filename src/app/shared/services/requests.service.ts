import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  public get<T>(route: string): Observable<T> {
    return this.http.get<T>(this.createRoute(route), {
      headers: this.generateHeaders(),
    });
  }

  public create<T>(route: string, body: any): Observable<T> {
    return this.http.post<T>(this.createRoute(route), body, {
      headers: this.generateHeaders(),
    });
  }

  public update<T>(route: string, body: any): Observable<T> {
    return this.http.put<T>(this.createRoute(route), body, {
      headers: this.generateHeaders(),
    });
  }

  public delete = (route: string) => {
    return this.http.delete(this.createRoute(route), {
      headers: this.generateHeaders(),
    });
  };

  private createRoute = (route: string) => {
    return `${environment.dbURL}/${route}`;
  };

  private generateHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + this.authService.token,
    });
  }
}
