import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRespondentPageRoutingModule } from './add-respondent-routing.module';

import { AddRespondentPage } from './add-respondent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRespondentPageRoutingModule
  ],
  declarations: [AddRespondentPage]
})
export class AddRespondentPageModule {}
