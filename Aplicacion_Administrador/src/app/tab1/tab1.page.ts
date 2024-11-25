import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: false
})
export class Tab1Page implements OnInit{


  username = sessionStorage.getItem('username');
  user= "";
  userdata:any
  usuario= {
    id: "",
    rut: 0,
    username: "",
    email: "",
    pnombre: "",
    apellido: "",
    carrera: "",
    password: "",
    isactive: true
  };

  updateForm:FormGroup;
 
  constructor(private auth :AuthService, private alertcontroller: AlertController, 
    private router: Router, private fBuilder:FormBuilder) {
      this.updateForm = this.fBuilder.group({
        'username' : new FormControl ("", [Validators.required, Validators.minLength(6)]),
        'pnombre' : new FormControl ("", [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
        'apellido' : new FormControl ("", [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
        'rut' : new FormControl ("", [Validators.required, Validators.pattern(/^\d{8}$/)]),
        'carrera' : new FormControl ("", [ Validators.pattern(/^[a-zA-Z\s]*$/)]),
        'email': new FormControl ("", [Validators.required, Validators.email]),
      })
      
     }

  ngOnInit() {
    this.auth.GetUserByUsername(this.username).subscribe(resp =>{
      this.userdata = resp;
      this.usuario ={
        id: this.userdata[0].id,
        rut: this.userdata[0].rut,
        username: this.userdata[0].username,
        email: this.userdata[0].email,
        pnombre: this.userdata[0].pnombre,
        apellido: this.userdata[0].apellido,
        carrera: this.userdata[0].carrera,
        password: this.userdata[0].password,
        isactive: this.userdata[0].isactive
      };
      console.log(this.usuario.email)
    });
    
  }

  async updatUsuario(){
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
             this.editarUsuario();
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


  editarUsuario(){
    this.auth.PutUsuario(this.usuario).subscribe();
    this.msgEdit();
  }

  async msgEdit(){
    const alert = await this.alertcontroller.create({
      mode:'ios', //Cambiar diseño de la laerta
      message:'Se ha cambiado la informacion de tu perfil con exito!',
      cssClass:'alertHeader', //CAmbiar de color la alerta
      header: 'Modificacion de Perfil' ,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alerta confirmada');
            this.router.navigate(['/tabs/tab2']);
          },
        },
      ],
    });

    await alert.present();
  }


  }

  

