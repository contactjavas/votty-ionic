import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteDetailPage } from './vote-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VoteDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteDetailPageRoutingModule {}
