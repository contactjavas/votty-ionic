import { Injectable } from '@angular/core';

import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";

import { RespondentData } from "src/app/interfaces/respondent";

@Injectable({
  providedIn: "root",
})
export class RespondentListStateService {
  respondentList = new BehaviorSubject<RespondentData[]>([]);

  constructor() {}

  get() {
    return this.respondentList.asObservable();
  }

  set(value: RespondentData[]) {
    this.respondentList.next(value);
  }

  add(respondent: RespondentData) {
    this.get()
      .pipe(take(1))
      .subscribe((respondentList: RespondentData[]) => {
        respondentList.unshift(respondent);
        this.set(respondentList);
      });
  }

  remove(index: number) {
    this.get()
      .pipe(take(1))
      .subscribe((respondentList: RespondentData[]) => {
        respondentList.splice(index, 1);
        this.set(respondentList);
      });
  }
}
