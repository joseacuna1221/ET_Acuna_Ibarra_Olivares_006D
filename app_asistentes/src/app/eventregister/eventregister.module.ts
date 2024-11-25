import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventregisterPageRoutingModule } from './eventregister-routing.module';

import { EventregisterPage } from './eventregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventregisterPageRoutingModule
  ],
  declarations: [EventregisterPage]
})
export class EventregisterPageModule {}
