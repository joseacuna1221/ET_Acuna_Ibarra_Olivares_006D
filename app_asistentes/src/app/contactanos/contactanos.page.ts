import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {

  nom:string="";
  email:string="";
  tel:string="";
  comentario:string="";

  constructor(private alertcontroller: AlertController,
    private router:Router) { }

  async mostrarMensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Confirmación!',
      message:'Gracias por contactarse con nosotros! '+ this.email,
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
    this.nom="";
    this.email="";
    this.tel="";
    this.comentario="";
  }
}

