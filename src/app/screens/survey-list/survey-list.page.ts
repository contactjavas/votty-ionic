import { Component, OnDestroy, OnInit } from '@angular/core';

import { Storage } from "@ionic/storage";

import { Subscription } from "rxjs";

import { SurveyListStateService } from "../../states/survey-list/survey-list-state.service";
import { SurveyService } from "../../services/survey/survey.service";
import { SurveyData } from 'src/app/interfaces/survey';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: "app-survey-list",
  templateUrl: "./survey-list.page.html",
  styleUrls: ["./survey-list.page.scss"],
})
export class SurveyListPage implements OnInit, OnDestroy {
  subscription: Subscription;
  surveys: SurveyData[] = [];

  constructor(
    private storage: Storage,
    private authService: AuthService,
    private surveyListState: SurveyListStateService,
    private surveyService: SurveyService
  ) {}

  ngOnInit() {
    this.fetchAll(null);
    this.subscribeSurveyList();
  }

  fetchAll(refresher: any) {
    this.surveyService.fetchAll().subscribe(
      (res) => {
        this.surveyListState.set(res.data);
        this.surveys = res.data;

        if (refresher) {
          refresher.target.complete();
        }
      },
      (err) => {
        console.log(err);

        if (refresher) {
          refresher.target.complete();
        }
      }
    );
  }

  subscribeSurveyList() {
    this.subscription = this.surveyListState
      .get()
      .subscribe((surveys: SurveyData[]) => {
        this.surveys = surveys;
      });
  }

  logout() {
    this.authService.logout();
  }

  doRefresh(event: any) {
    this.fetchAll(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
