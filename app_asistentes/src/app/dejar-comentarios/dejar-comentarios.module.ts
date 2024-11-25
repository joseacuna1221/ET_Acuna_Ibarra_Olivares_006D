import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DejarComentariosPageRoutingModule } from './dejar-comentarios-routing.module';

import { DejarComentariosPage } from './dejar-comentarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DejarComentariosPageRoutingModule
  ],
  declarations: [DejarComentariosPage]
})
export class DejarComentariosPageModule {}
