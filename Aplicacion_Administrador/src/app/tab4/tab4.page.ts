import { Component, OnInit } from '@angular/core';4
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApicrudeventosService } from '../services/apicrudeventos.service';
import { IEvento } from 'src/interfaces/IEventos';

@Component({
    selector: 'app-tab4',
    templateUrl: './tab4.page.html',
    styleUrls: ['./tab4.page.scss'],
    standalone: false
})
export class Tab4Page implements OnInit {

  newEventForm: FormGroup;
  
 evento:IEvento= {
  nombre: "",
  lugar:"",
  cupos: 0,
  fecha:"",
  anfitrion:"",
  descripcion:"",
  asistentes:[],
  comentarios:[]
 }
  constructor(private alertcontroller: AlertController, private apicrud:ApicrudeventosService,
              private router:Router,private fbuilder:FormBuilder) { 
                this.newEventForm = this.fbuilder.group({
                  'nombre' : new FormControl("", [Validators.required]),
                  'lugar' : new FormControl("", [Validators.required]),
                  'cupos' : new FormControl("", [Validators.required,Validators.pattern(/^[0-9]+$/)]),
                  'fecha' : new FormControl("", [Validators.required]),
                  'anfitrion' : new FormControl("", [Validators.required]),
                  'descripcion' : new FormControl("", [Validators.required,  Validators.minLength(20)]),
                })
              }

  ngOnInit() {
    
  }

  crearEvento(){
    if (this.newEventForm.valid)
      this.evento.nombre = this.newEventForm.value.nombre;
      this.evento.lugar = this.newEventForm.value.lugar;
      this.evento.cupos = this.newEventForm.value.cupos;
      this.evento.fecha = this.newEventForm.value.fecha;
      this.evento.anfitrion = this.newEventForm.value.anfitrion;
      this.evento.descripcion = this.newEventForm.value.descripcion;
      this.apicrud.postEventos(this.evento).subscribe();
      this.newEventForm.reset();
      this.mensajeEvent();
  }

  async mensajeEvent(){
    const alert = await this.alertcontroller.create({
      mode:'ios', //Cambiar diseño de la laerta
      message:'El evento ' + this.evento.nombre + ' se ha creado con exito.',
      cssClass:'alertHeader', //CAmbiar de color la alerta
      header: 'Evento creado' ,
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
}
