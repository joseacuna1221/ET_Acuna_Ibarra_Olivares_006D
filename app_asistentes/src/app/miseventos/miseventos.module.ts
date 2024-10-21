import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiseventosPageRoutingModule } from './miseventos-routing.module';

import { MiseventosPage } from './miseventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiseventosPageRoutingModule
  ],
  declarations: [MiseventosPage]
})
export class MiseventosPageModule {}
