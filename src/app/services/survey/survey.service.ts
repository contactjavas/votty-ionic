import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Response } from "../../interfaces/response";
import { AppService } from "../app/app.service";
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private appService: AppService
  ) { }

  fetchAll(token: String): Observable<Response> {
    this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
      "Authorization",
      "Bearer " + token
    );

    return this.http
      .get<Response>(
        this.appService.apiUrl + "/surveys",
        this.appService.httpOptions
      )
      .pipe(catchError(this.errorService.handleError));
  }
}
