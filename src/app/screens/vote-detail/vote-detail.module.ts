import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteDetailPageRoutingModule } from './vote-detail-routing.module';

import { VoteDetailPage } from './vote-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoteDetailPageRoutingModule
  ],
  declarations: [VoteDetailPage]
})
export class VoteDetailPageModule {}
