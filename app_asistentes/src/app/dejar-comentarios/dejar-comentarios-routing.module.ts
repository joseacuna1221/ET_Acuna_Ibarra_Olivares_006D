import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DejarComentariosPage } from './dejar-comentarios.page';

const routes: Routes = [
  {
    path: '',
    component: DejarComentariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DejarComentariosPageRoutingModule {}
