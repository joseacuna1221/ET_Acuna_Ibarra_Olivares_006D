import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscritoPageRoutingModule } from './inscrito-routing.module';

import { InscritoPage } from './inscrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscritoPageRoutingModule
  ],
  declarations: [InscritoPage]
})
export class InscritoPageModule {}
