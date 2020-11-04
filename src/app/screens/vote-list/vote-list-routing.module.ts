import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteListPage } from './vote-list.page';

const routes: Routes = [
  {
    path: '',
    component: VoteListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteListPageRoutingModule {}
