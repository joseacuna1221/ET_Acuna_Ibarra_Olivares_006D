import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventregisterPage } from './eventregister.page';

const routes: Routes = [
  {
    path: '',
    component: EventregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventregisterPageRoutingModule {}
