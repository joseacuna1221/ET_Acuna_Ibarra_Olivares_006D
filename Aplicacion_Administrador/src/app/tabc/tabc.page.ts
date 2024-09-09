import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabc',
  templateUrl: './tabc.page.html',
  styleUrls: ['./tabc.page.scss'],
})
export class TabcPage implements OnInit {

  nombreEvento:string="";
  juego:string="";
  maxParticipantes:string="";
  maxEspectadores:string="";

  constructor(private alertcontroller: AlertController,
    private router:Router) { }

  async mostrarMensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Confirmación',
      message:'Evento creado exitosamente! ',
      mode:'ios',
      buttons: [
       {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Datos enviados');
            this.router.navigate(['/tabs/tab1']);
            this.limpiar();
          },
        },
      ],
    });
    await alert.present();
    }

  ngOnInit() {
  }

  limpiar(){
    this.nombreEvento="";
    this.juego="";
    this.maxParticipantes="";
    this.maxEspectadores="";
  }
}

