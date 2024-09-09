import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  correo:string="";
  pass:string="";

  constructor(private alertcontroller:AlertController,
    private router:Router
  ) { }

  ngOnInit() {
  }

  async login(){
    const alert = await this.alertcontroller.create({
      header: 'prokiosk',
      mode:'ios',
      message: 'Bienvenido! '+this.correo,
      buttons: [
        {
          text: 'Ingresar',
          role: 'confirm',
          handler: () => {
             this.router.navigate(['/tabs/tab1']);
          },
        },
      ],
    });

    await alert.present();




  }
}
