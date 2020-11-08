import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Response } from "../../interfaces/response";
import { AppService } from "../app/app.service";
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: "root",
})
export class RespondentService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private appService: AppService
  ) {}

  fetchAll(token: string): Observable<Response> {
    this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
      "Authorization",
      "Bearer " + token
    );

    return this.http
      .get<Response>(
        this.appService.apiUrl + "/respondents",
        this.appService.httpOptions
      )
      .pipe(catchError(this.errorService.handleError));
  }

  fetchAddFormData(token: string): Observable<Response> {
    this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
      "Authorization",
      "Bearer " + token
    );

    return this.http
      .get<Response>(
        this.appService.apiUrl + "/respondents/add",
        this.appService.httpOptions
      )
      .pipe(catchError(this.errorService.handleError));
  }

  add(token: string, formData: any): Observable<Response> {
    return this.http
      .post<Response>(
        this.appService.apiUrl + "/login",
        formData,
        this.appService.httpOptions
      )
      .pipe(catchError(this.errorService.handleError));
  }
}
