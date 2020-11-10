import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteListPageRoutingModule } from './vote-list-routing.module';

import { VoteListPage } from './vote-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoteListPageRoutingModule
  ],
  declarations: [VoteListPage]
})
export class VoteListPageModule {}
