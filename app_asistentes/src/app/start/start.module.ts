import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StartPageRoutingModule } from './start-routing.module';
import { StartPage } from './start.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StartPageRoutingModule
  ],
  declarations: [StartPage]
})
export class StartPageModule {}
