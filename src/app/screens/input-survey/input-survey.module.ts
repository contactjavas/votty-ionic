import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { InputSurveyPageRoutingModule } from './input-survey-routing.module';

import { InputSurveyPage } from './input-survey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InputSurveyPageRoutingModule,
  ],
  declarations: [InputSurveyPage],
})
export class InputSurveyPageModule {}
