import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.page.html',
  styleUrls: ['./detalle-evento.page.scss'],
})
export class DetalleEventoPage implements OnInit {

  evento:any;
  username = sessionStorage.getItem('username')
  comentario:string ="";

  constructor(private activated:ActivatedRoute, private router:Router, private apicrud:ApicrudService,
    private alertcontroller:AlertController
  ) {
    this.activated.queryParams.subscribe(param => {
      try {
        if (param['evento']) {
          this.evento = JSON.parse(param['evento']);
        } else {
          this.evento = {};  // Si el evento no viene, lo inicializas vacío
          console.error('No se ha proporcionado evento');
        }
      } catch (e) {
        console.error('Error al parsear el evento:', e);
      }
    });
  };
  
  ngOnInit() {
    console.log(this.evento)
  }

  verComentarios(Observable:any){
    this.router.navigate(['/comentarios'],
      {queryParams:{evento: JSON.stringify(Observable)}})
  }

  enviarComentarios(){
    if (this.comentario.trim() === '' ) {
      this.mensajeError();
      return;
    } else {
      this.evento.comentarios.push({comentario:this.comentario,user:this.username});
      this.apicrud.putEventos(this.evento).subscribe();
      this.mensajeSucces();
      this.comentario="";
    }
  }

  async mensajeError(){
    const alert = await this.alertcontroller.create({
      mode:'ios', //Cambiar diseño de la laerta
      message:'No puede dejar un comentario vacio',
      cssClass:'alertHeader', //CAmbiar de color la alerta
      header: 'Error!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Error comentario vacio');
          },
        },
      ],
    });

    await alert.present();
  }

  async mensajeSucces(){
    const alert = await this.alertcontroller.create({
      mode:'ios', //Cambiar diseño de la laerta
      message:'Gracias por tu colaboracion',
      cssClass:'alertHeader', //CAmbiar de color la alerta
      header: 'Comentario enviado!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Comentario enviado');
            this.router.navigate(['/tabs/tab2'])
          },
        },
      ],
    });

    await alert.present();
  }

}
