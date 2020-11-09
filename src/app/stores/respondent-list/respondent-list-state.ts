import { Injectable } from "@angular/core";

import { Subject, BehaviorSubject, Observable } from "rxjs";

import { RespondentService } from "../../services/respondent/respondent.service";

import { RespondentData } from "src/app/interfaces/respondent";


@Injectable({
  providedIn: "root",
})
export class RespondentListState {
  respondentList = new BehaviorSubject<RespondentData[]>([]);

  constructor(private respondentService: RespondentService) {}

  get() {
    return this.respondentList.asObservable();
  }

  set(value: RespondentData[]) {
    this.respondentList.next(value);
  }

  add(respondent: RespondentData) {
    const subscription = this.get().subscribe(
      (respondentList: RespondentData[]) => {
        respondentList.push(respondent);
        this.set(respondentList);
        subscription.unsubscribe();
      }
    );
  }

  remove(index: number) {
    const subscription = this.get().subscribe(
      (respondentList: RespondentData[]) => {
        respondentList.splice(index, 1);
        this.set(respondentList);
        subscription.unsubscribe();
      }
    );
  }
}
