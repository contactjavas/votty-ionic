import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AppService {
  public apiUrl = "https://votty-survey.diggy.id/api";
  public httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "",
    }),
  };

  constructor() {}
}
