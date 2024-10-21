import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiseventosPage } from './miseventos.page';

const routes: Routes = [
  {
    path: '',
    component: MiseventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiseventosPageRoutingModule {}
