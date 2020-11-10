import { Injectable } from '@angular/core';

import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";

import { SurveyData } from "src/app/interfaces/survey";

@Injectable({
  providedIn: "root",
})
export class SurveyListStateService {
  surveyList = new BehaviorSubject<SurveyData[]>([]);

  constructor() {}

  get() {
    return this.surveyList.asObservable();
  }

  set(value: SurveyData[]) {
    this.surveyList.next(value);
  }

  add(survey: SurveyData) {
    this.get()
      .pipe(take(1))
      .subscribe((surveyList: SurveyData[]) => {
        surveyList.unshift(survey);
        this.set(surveyList);
      });
  }

  remove(index: number) {
    this.get()
      .pipe(take(1))
      .subscribe((surveyList: SurveyData[]) => {
        surveyList.splice(index, 1);
        this.set(surveyList);
      });
  }
}
