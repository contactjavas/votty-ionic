import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { Storage } from "@ionic/storage";

import { Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

import { LoginData } from 'src/app/interfaces/user';
import { Menu } from "../../classes/menu/menu";
import { AppService } from '../app/app.service';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  menus = [];
  loggedInState = new Subject<any>();

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private appService: AppService,
    private menu: Menu
  ) {}

  login(data: LoginData): Observable<Response> {
    return this.http
      .post<Response>(
        this.appService.apiUrl + "/login",
        data,
        this.appService.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  logout() {
    this.storage.remove("token");
    this.storage.remove("user");

    this.menus = this.menu.notLoggedIn;
  }

  getLoggedInState() {
    return this.loggedInState.asObservable();
  }

  setLoggedInState(value: Boolean) {
    this.loggedInState.next(value);
  }

  /**
   * We can't just use handleError from ErrorService to prevent cyclic/ circular dependency.
   * Because ErrorService imports AuthService, then we can't import ErrorService from here.
   *
   * @param httpError HttpErrorResponse
   */
  public handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error("An error occurred:", httpError.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(`Backend returned code ${httpError.status}, ` + `body was: ${httpError.error}`);
    }

    // Use "custom generated" error object.
    let appError = httpError.error;

    // Bring "server generated" error properties to our custom error object.
    appError.status = httpError.status;
    appError.statusText = httpError.statusText;

    // Choose where to get the "message" property.
    if (httpError.error) {
      if (!httpError.error.message) {
        appError.message = httpError.error;
      }
    } else {
      appError.message = httpError.message;
    }

    console.log(appError.message);

    // return an observable with a user-facing error message
    return throwError(appError);
  }
}
