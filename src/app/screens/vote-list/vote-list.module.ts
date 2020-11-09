import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteListPageRoutingModule } from './vote-list-routing.module';

import { VoteListPage } from './vote-list.page';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { VoteListState } from 'src/app/stores/vote-list/vote-list-state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoteListPageRoutingModule
  ],
  declarations: [VoteListPage, TopbarComponent, VoteListState]
})
export class VoteListPageModule {}
