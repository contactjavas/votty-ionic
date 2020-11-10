import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AutocompleteService {
  labelAttribute = "name";
  formValueAttribute = '';

  private countries: any[] = [];

  constructor(private http: HttpClient) {}
}
