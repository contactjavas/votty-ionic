import { Injectable } from '@angular/core';

import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";

import { VoteData } from "src/app/interfaces/vote";

@Injectable({
  providedIn: "root",
})
export class VoteListStateService {
  voteList = new BehaviorSubject<VoteData[]>([]);

  constructor() {}

  get() {
    return this.voteList.asObservable();
  }

  set(value: VoteData[]) {
    this.voteList.next(value);
  }

  add(vote: VoteData) {
    this.get()
      .pipe(take(1))
      .subscribe((voteList: VoteData[]) => {
        voteList.unshift(vote);
        this.set(voteList);
      });
  }

  remove(index: number) {
    this.get()
      .pipe(take(1))
      .subscribe((voteList: VoteData[]) => {
        voteList.splice(index, 1);
        this.set(voteList);
      });
  }
}
