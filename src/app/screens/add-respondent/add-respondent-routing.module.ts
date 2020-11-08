import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRespondentPage } from './add-respondent.page';

const routes: Routes = [
  {
    path: '',
    component: AddRespondentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRespondentPageRoutingModule {}
