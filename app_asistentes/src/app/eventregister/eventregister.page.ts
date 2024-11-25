import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';
import { IEventos } from 'src/interfaces/IEventos';


@Component({
  selector: 'app-eventregister',
  templateUrl: './eventregister.page.html',
  styleUrls: ['./eventregister.page.scss'],
})
export class EventregisterPage implements OnInit {

  evento:any;
  username:any;
  duplicidad:any;
  infoevent = {
    id:"",
    nombre:"",
    lugar:"",
    cupos:"",
    fecha:"",
    anfitrion:"",
    descripcion:"",
    asistentes:[],
    comentarios: []
  }
  constructor(private alertcontroller: AlertController, private activated:ActivatedRoute, private apicrud:ApicrudService,
    private router: Router) {
      this.username = sessionStorage.getItem('username');
      this.activated.queryParams.subscribe(param => {
        this.evento = JSON.parse(param['evento'])
      })
     }

  ngOnInit() {
    this.infoevent = this.evento;
  }

  async mensajeEvento(){
    const alert = await this.alertcontroller.create({
      mode:'ios', //Cambiar diseño de la laerta
      message:'Para ingresar al evento deberas mostrar tu codigo QR',
      cssClass:'alertHeader', //CAmbiar de color la alerta
      header: 'Inscripcion exitosa!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alerta confirmada');
            this.router.navigate(['/tabs/tab3']);
          },
        },
      ],
    });

    await alert.present();
  }

  registrarAsistencia() {
    this.apicrud.getEventoById(this.evento.id).subscribe(data => {
      this.duplicidad = data;
  
      for (let asistente of this.duplicidad.asistentes) {
        if (asistente.username === this.username) {
          this.errorMensaje();
          return;
        }
      }
  
      this.evento.asistentes.push({ username: this.username, estado: 'registrado' });
      this.apicrud.putEventos(this.evento).subscribe();
      this.mensajeEvento();
    });
  }

  async errorMensaje(){
    const alert = await this.alertcontroller.create({
      mode:'ios', //Cambiar diseño de la laerta
      message:'Usted ya se encuentra registrado a este evento',
      cssClass:'alertHeader', //CAmbiar de color la alerta
      header: 'Error...',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Error: Usuario ya registrado');
            this.router.navigate(['/tabs/tab3']);
          },
        },
      ],
    });
    await alert.present();
    }

}
