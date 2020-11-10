import { Component, OnDestroy, OnInit } from '@angular/core';

import { Storage } from "@ionic/storage";

import { Subscription } from 'rxjs';

import { RespondentService } from "../../services/respondent/respondent.service";
import { RespondentListStateService } from '../../states/respondent-list/respondent-list-state.service';

import { RespondentData } from 'src/app/interfaces/respondent';
import { Response } from "../../interfaces/response";
import { AuthService } from 'src/app/services/auth/auth.service';

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
    private authService: AuthService,
    private respondentService: RespondentService,
    public respondentListState: RespondentListStateService
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
