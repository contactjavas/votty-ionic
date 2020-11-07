import { Component, OnInit } from '@angular/core';

import { Storage } from "@ionic/storage";

import { SurveyService } from "../../services/survey/survey.service";

import { SurveyData } from 'src/app/interfaces/survey';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.page.html',
  styleUrls: ['./survey-list.page.scss'],
})
export class SurveyListPage implements OnInit {

  surveys: SurveyData[] = [];

  constructor(
    private storage: Storage,
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.fetchAll(null);
  }

  fetchAll(refresher: any) {
    this.storage.get("token").then(token => {
      if (!token) return;

      this.surveyService.fetchAll(token).subscribe(
        res => {
          this.storage.set("surveys", res.data);
          this.surveys = res.data;

          if (refresher) {
            refresher.target.complete();
          }
        },
        err => {
          console.log(err);

          if (refresher) {
            refresher.target.complete();
          }
        }
      );
    });
  }

  doRefresh(event: any) {
    this.fetchAll(event);
  }

}
