import { Injectable } from '@angular/core';
import { environment } from '../../../env/env';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService<T> {
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params:HttpParams = new HttpParams(), headers:HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.http
      .get<T>(`${environment.api_url}${path}`, { params, headers })
      .pipe(catchError(this.formatErrors));
  }

  getAll(path: string, params:HttpParams = new HttpParams(), headers:HttpHeaders = new HttpHeaders()): Observable<T[]> {
    return this.http
      .get<T[]>(`${environment.api_url}${path}`, { headers, params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<T> {
    return this.http
      .put<T>(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, options: Object = {}): Observable<T> {
    return this.http
      .post<T>(`${environment.api_url}${path}`, JSON.stringify(body), options)
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<T> {
    return this.http
      .delete<T>(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
