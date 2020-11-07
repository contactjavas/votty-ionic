import { Component, OnInit } from '@angular/core';

import { Storage } from "@ionic/storage";

import { RespondentService } from "../../services/respondent/respondent.service";

import { RespondentData } from 'src/app/interfaces/respondent';

@Component({
  selector: 'app-respondent-list',
  templateUrl: './respondent-list.page.html',
  styleUrls: ['./respondent-list.page.scss'],
})
export class RespondentListPage implements OnInit {

  respondents: RespondentData[] = [];

  constructor(
    private storage: Storage,
    private respondentService: RespondentService
  ) { }

  ngOnInit() {
    this.fetchAll(null);
  }

  fetchAll(refresher: any) {
    this.storage.get("token").then(token => {
      if (!token) return;

      this.respondentService.fetchAll(token).subscribe(
        res => {
          this.storage.set("respondents", res.data);
          this.respondents = res.data;

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
