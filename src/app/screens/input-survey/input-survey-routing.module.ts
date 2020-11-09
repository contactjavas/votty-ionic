import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputSurveyPage } from './input-survey.page';

const routes: Routes = [
  {
    path: '',
    component: InputSurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputSurveyPageRoutingModule {}
