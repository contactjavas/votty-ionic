import { Component, OnDestroy, OnInit } from "@angular/core";

import { Storage } from "@ionic/storage";

import { Subscription } from "rxjs";
import { format, parseISO } from "date-fns";
import { id as idLocale } from "date-fns/locale";

import { VoteService } from "../../services/vote/vote.service";

import { VoteData } from "src/app/interfaces/vote";
import { VoteListState } from "src/app/stores/vote-list/vote-list-state";

@Component({
  selector: "app-vote-list",
  templateUrl: "./vote-list.page.html",
  styleUrls: ["./vote-list.page.scss"],
})
export class VoteListPage implements OnInit, OnDestroy {
  subscription: Subscription;
  votes: VoteData[] = [];

  constructor(
    private storage: Storage,
    private voteService: VoteService,
    private voteListState: VoteListState
  ) {}

  ngOnInit() {
    this.fetchAll(null);
    this.subscribeVoteList();
  }

  formatToDate(dateStr: string) {
    return format(parseISO(dateStr), "EEEE, dd MMMM yyyy", {
      locale: idLocale,
    });
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

  subscribeVoteList() {
    this.subscription = this.voteListState
      .get()
      .subscribe((votes: VoteData[]) => {
        this.votes = votes;
      });
  }

  doRefresh(event: any) {
    this.fetchAll(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
