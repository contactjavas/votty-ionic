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
export class VoteService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private appService: AppService
  ) { }

  fetchAll(): Observable<Response> {
    return this.http
      .get<Response>(
        this.appService.apiUrl + "/votes",
        this.appService.httpOptions
      )
      .pipe(catchError(this.errorService.handleError));
  }

}
