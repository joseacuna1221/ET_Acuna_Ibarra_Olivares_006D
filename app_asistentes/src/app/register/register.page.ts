import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NewUser } from 'src/interfaces/users';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registroForm: FormGroup;

  nuevoUsuario={
    username:"",
    email:"",
    rut:0,
    pnombre:"",
    apellido:"",
    carrera:"",
    password:"",
    isactive: false
  }

  userdata:any;

  constructor(private authservice: AuthService, 
    private alertcontroller: AlertController,
    private router: Router,
    private fBuilder: FormBuilder) { 
      this.registroForm = this.fBuilder.group({
        'username' : new FormControl ("", [Validators.required, Validators.minLength(6)]),
        'pnombre' : new FormControl ("", [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
        'apellido' : new FormControl ("", [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
        'rut' : new FormControl ("", [Validators.required, Validators.pattern(/^\d{8}$/)]),
        'carrera' : new FormControl ("", [ Validators.pattern(/^[a-zA-Z\s]*$/)]),
        'email': new FormControl ("", [Validators.required, Validators.email]),
        'password': new FormControl("", [Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      })
    }

  ngOnInit() {
  }

  crearUsuario(){
    if (this.registroForm.valid){
      this.authservice.GetUserByUsername(this.registroForm.value.username).subscribe(resp=>{
        this.userdata = resp; 
        if(this.userdata.length>0){
           this.registroForm.reset();
          this.errorDuplicidad();
        }
        else{
          this.nuevoUsuario.username = this.registroForm.value.username;
          this.nuevoUsuario.password = this.registroForm.value.password;
          this.nuevoUsuario.email = this.registroForm.value.email;
          this.nuevoUsuario.pnombre = this.registroForm.value.pnombre;
          this.nuevoUsuario.apellido = this.registroForm.value.apellido;
          this.nuevoUsuario.carrera = this.registroForm.value.carrera;
          this.nuevoUsuario.rut = this.registroForm.value.rut;
          this.nuevoUsuario.isactive=true;
          this.authservice.PostUsuario(this.nuevoUsuario).subscribe();
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/inicio');
        }
      })
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({
      header: 'Usuario creado',
      message: 'Bienvenid@! ' + this.nuevoUsuario.username,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad(){
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Este usuario ya esta registrado',
      buttons: ['OK']
    });
    alerta.present();
  }


}
