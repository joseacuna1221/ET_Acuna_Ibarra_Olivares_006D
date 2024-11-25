import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { IEventos } from 'src/interfaces/IEventos';
import { Router ,ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  eventos: IEventos[]=[];
  evento: any;
  eventito: any;
  username = sessionStorage.getItem('username');

  constructor(private menucontroller: MenuController, private apicrud: ApicrudService, private router:Router,
    private activated: ActivatedRoute, private alertcontroller: AlertController) {
      this.activated.queryParams.subscribe(param =>{
        if (param['evento']) {
          try {
            this.evento = JSON.parse(param['evento']);  // Intentar parsear el evento
          } catch (e) {
            console.error('Error al parsear JSON: ', e);
          }
        }
      });
    }


  ngOnInit() {
    if (this.username) 
    this.apicrud.getEventosByUsername(this.username).subscribe(data=>{
      this.eventos=data;
      console.log(this.eventos)
    })
  }

  generarQr(Observable:any){
    this.router.navigate(['/qr'],
    {queryParams:{evento: JSON.stringify(Observable)}})
  }

  eliminarAsistencia(id:string){
    this.apicrud.getEventoById(id).subscribe(data=>{
      this.eventito=data;
          this.eventito.asistentes = this.eventito.asistentes.filter((asistente:{username:string}) => asistente.username !== this.username)
          this.apicrud.putEventos(this.eventito).subscribe();
          this.confirmMensaje();
       
    });
  
  }

  async confirmacion(id:string){
    const alert = await this.alertcontroller.create({
      header: 'Actualización',
      mode:'ios',
      cssClass:'alertHeader',
      message: '¿Estas seguro que desea cancelar su asistencia al evento?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
             this.eliminarAsistencia(id)
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          },
        },
      ],
    });
    await alert.present();
  }

  masInformacion(Observable:any){
    this.router.navigate(['/detalle-evento'],
      {queryParams:{evento: JSON.stringify(Observable)}})
  }

  async confirmMensaje(){
    const alert = await this.alertcontroller.create({
      mode:'ios', //Cambiar diseño de la laerta
      message:'Se ha cancelado su asistencia al evento',
      cssClass:'alertHeader', //CAmbiar de color la alerta
      header: 'Solicitud exitosa!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Asistencia cancelada');
            
          },
        },
      ],
    });
    await alert.present();
    }
}
