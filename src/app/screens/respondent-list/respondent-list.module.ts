import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondentListPageRoutingModule } from './respondent-list-routing.module';

import { RespondentListPage } from './respondent-list.page';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { RespondentListState } from 'src/app/stores/respondent-list/respondent-list-state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondentListPageRoutingModule
  ],
  declarations: [RespondentListPage, TopbarComponent, RespondentListState]
})
export class RespondentListPageModule {}
