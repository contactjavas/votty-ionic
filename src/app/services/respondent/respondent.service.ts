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
    return this.http
      .get<Response>(
        this.appService.apiUrl + "/respondents",
        this.appService.httpOptions
      )
      .pipe(catchError(this.errorService.handleError));
  }

  fetchAddFormData(token: string): Observable<Response> {
    return this.http
      .get<Response>(
        this.appService.apiUrl + "/respondents/add",
        this.appService.httpOptions
      )
      .pipe(catchError(this.errorService.handleError));
  }

  add(data: any): Observable<Response> {
    const formData = new FormData();

    for (const prop in data) {
      formData.append(prop, data[prop]);
    }

    const httpOptions = this.appService.httpOptions;
    httpOptions.headers = httpOptions.headers.delete("Content-Type");

    return this.http
      .post<Response>(
        this.appService.apiUrl + "/respondents/add-new",
        formData,
        httpOptions
      )
      .pipe(catchError(this.errorService.handleError));
  }
}
