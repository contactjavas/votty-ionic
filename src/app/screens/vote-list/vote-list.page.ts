import { Component, OnInit } from '@angular/core';

import { Storage } from "@ionic/storage";

import { format, parseISO } from "date-fns";
import { id as idLocale } from "date-fns/locale";

import { VoteService } from "../../services/vote/vote.service";

import { VoteData } from "src/app/interfaces/vote";

@Component({
  selector: "app-vote-list",
  templateUrl: "./vote-list.page.html",
  styleUrls: ["./vote-list.page.scss"],
})
export class VoteListPage implements OnInit {
  votes: VoteData[] = [];

  constructor(
    private storage: Storage,
    private voteService: VoteService
  ) {}

  ngOnInit() {
    this.fetchAll(null);
  }

  formatToDate(dateStr: string) {
    return format(parseISO(dateStr), "EEEE, dd MMMM yyyy", { locale: idLocale });
  }

  formatToTime(dateStr: string) {
    return format(parseISO(dateStr), "HH:mm:ss", { locale: idLocale });
  }

  fetchAll(refresher: any) {
    this.storage.get("token").then((token) => {
      if (!token) return;

      this.voteService.fetchAll(token).subscribe(
        (res) => {
          this.storage.set("votes", res.data);
          this.votes = res.data;

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
    });
  }

  doRefresh(event: any) {
    this.fetchAll(event);
  }
}
