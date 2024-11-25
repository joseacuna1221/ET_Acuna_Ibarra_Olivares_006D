import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ApicrudeventosService } from '../services/apicrudeventos.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
    selector: 'app-editevent',
    templateUrl: './editevent.page.html',
    styleUrls: ['./editevent.page.scss'],
    standalone: false
})
export class EditeventPage implements OnInit {

  evento:any;
  updateForm:FormGroup;
  infoevent = {
    id:"",
    nombre:"",
    lugar:"",
    cupos:"",
    fecha:"",
    anfitrion:"",
    descripcion:""
  }


  constructor(private alertcontroller: AlertController, private activated:ActivatedRoute, private apicrud:ApicrudeventosService,
    private router: Router, private fBuilder:FormBuilder) {
      this.updateForm = this.fBuilder.group({
        'nombre' : new FormControl("", [Validators.required]),
        'lugar' : new FormControl("", [Validators.required]),
        'cupos' : new FormControl("", [Validators.required,Validators.pattern(/^[0-9]+$/)]),
        'fecha' : new FormControl("", [Validators.required]),
        'anfitrion' : new FormControl("", [Validators.required]),
        'descripcion' : new FormControl("", [Validators.required,  Validators.minLength(20)]),
      });
      this.activated.queryParams.subscribe(param => {
        this.evento = JSON.parse(param['evento'])
        this.updateForm.patchValue({
          nombre:this.evento.nombre,
          lugar:this.evento.lugar,
          cupos:this.evento.cupos,
          fecha:this.evento.fecha,
          anfitrion:this.evento.anfitrion,
          descripcion:this.evento.descripcion,
        });
      });
     }

  ngOnInit() {
    this.infoevent = this.evento;
  }

  async updatEvento(){
    const alert = await this.alertcontroller.create({
      header: 'Actualización',
      mode:'ios',
      cssClass:'alertHeader',
      message: '¿Estas seguro que deseas actualizar la informacion?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
             this.modificarEvento();
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
  
  async deleteEvent(){
    const alert = await this.alertcontroller.create({
      header: 'Eliminación',
      mode:'ios',
      cssClass:'alertHeader',
      message: '¿Estas segur@ que deseas cancelar el evento?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
             this.eliminaEvento();
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
  
   eliminaEvento(){
    this.apicrud.deleteEventos(this.evento).subscribe();
    this.msgDelete();
   }

  async msgDelete(){
  const alert = await this.alertcontroller.create({
    header: 'Eliminación',
    mode:'ios',
    cssClass:'alertHeader',
    message: 'El evento ha sido eliminado',
    buttons: [
      {
        text: 'Ok',
        role: 'confirm',
        handler: () => {
          this.router.navigate(['/tabs/tab3']);
        },
      },
    ],
  });
  await alert.present();
}
  
  async msgEdit(){
    const alert = await this.alertcontroller.create({
      mode:'ios', //Cambiar diseño de la laerta
      message:'Has editado el evento con exito!',
      cssClass:'alertHeader', //CAmbiar de color la alerta
      header: 'Evento Editado' ,
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

  modificarEvento(){
    this.evento.nombre = this.updateForm.value.nombre;
    this.evento.lugar = this.updateForm.value.lugar;
    this.evento.cupos = this.updateForm.value.cupos;
    this.evento.fecha = this.updateForm.value.fecha;
    this.evento.anfitrion = this.updateForm.value.anfitrion;
    this.evento.descripcion = this.updateForm.value.descripcion;
    this.apicrud.putEventos(this.evento).subscribe();
    this.updateForm.reset();
    this.msgEdit();
  }

  public eliminarButtons = [
    
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.router.navigate(['/tabs/tab3']);
      },
    },
  ];

  setResult(ev:CustomEvent) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
}
