import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondentListPageRoutingModule } from './respondent-list-routing.module';

import { RespondentListPage } from './respondent-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondentListPageRoutingModule
  ],
  declarations: [RespondentListPage]
})
export class RespondentListPageModule {}
