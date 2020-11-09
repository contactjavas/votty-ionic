import { Component, OnDestroy, OnInit } from '@angular/core';

import { Storage } from "@ionic/storage";

import { Subscription } from 'rxjs';

import { RespondentService } from "../../services/respondent/respondent.service";
import { RespondentListState } from '../../stores/respondent-list/respondent-list-state';

import { RespondentData } from 'src/app/interfaces/respondent';
import { Response } from "../../interfaces/response";

@Component({
  selector: "app-respondent-list",
  templateUrl: "./respondent-list.page.html",
  styleUrls: ["./respondent-list.page.scss"],
})
export class RespondentListPage implements OnInit, OnDestroy {
  subscription: Subscription;
  respondents: RespondentData[] = [];

  constructor(
    private storage: Storage,
    private respondentService: RespondentService,
    public respondentListState: RespondentListState
  ) {}

  ngOnInit() {
    this.fetchAll(null);
    this.subscribeRespondentList();
  }

  fetchAll(refresher: any) {
    this.respondentService.fetchAll().subscribe(
      (res: Response) => {
        this.storage.set("respondents", res.data);
        this.respondentListState.set(res.data);

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

  subscribeRespondentList() {
    this.subscription = this.respondentListState
      .get()
      .subscribe((respondents: RespondentData[]) => {
        this.respondents = respondents;
      });
  }

  doRefresh(event: any) {
    this.fetchAll(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
