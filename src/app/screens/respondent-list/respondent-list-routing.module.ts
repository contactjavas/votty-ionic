import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondentListPage } from './respondent-list.page';

const routes: Routes = [
  {
    path: '',
    component: RespondentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondentListPageRoutingModule {}
