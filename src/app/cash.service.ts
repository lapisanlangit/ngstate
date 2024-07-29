import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CashService {
  URL_ROOT: string = '';

  constructor(private http: HttpClient) {
    this.URL_ROOT = environment.apiUrl;
  }

  public retrieveCash(tanggal: string): Observable<any[]> {
    return this.http
      .get<any[]>(this.URL_ROOT + 'data/retrieveCash?tanggal=' + tanggal)
      .pipe(
        catchError(this.handleError), // then handle the error
      );
  }

  public retrieveDesa(): Observable<any[]> {
    console.log(this.URL_ROOT + 'desa/retrieveDesa');
    return this.http.get<any[]>(this.URL_ROOT + 'desa/retrieveDesa').pipe(
      catchError(this.handleError), // then handle the error
    );
  }

  public addCash(nilaiSimpan: any): Observable<any[]> {
    return this.http
      .post<any>(this.URL_ROOT + 'data/addCash/', nilaiSimpan)
      .pipe(catchError(this.handleError));
  }

  public updateCash(nilaiSimpan: any): Observable<any[]> {
    return this.http
      .post<any>(this.URL_ROOT + 'data/updateCash/', nilaiSimpan)
      .pipe(catchError(this.handleError));
  }

  public deleteCash(nilaiSimpan: any): Observable<any[]> {
    return this.http
      .post<any>(this.URL_ROOT + 'data/deleteCash/', nilaiSimpan)
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`,
      );
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  }
}
