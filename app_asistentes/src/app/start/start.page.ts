import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { UserauthService } from '../services/userauth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  userdata: any;

  usuario={
    id:0,
    username:"",
    email:"",
    password:""
  }

  loginForm:FormGroup;

  constructor(private authservice:UserauthService, private router:Router, private toast: ToastController,
    private alertcontroller: AlertController, private builder: FormBuilder) {
      this.loginForm = this.builder.group({
        'username' : new FormControl("", [Validators.required, Validators.minLength(6)]),
        'password' : new FormControl("", [Validators.required, Validators.minLength(8)]),
      })
     }
  

  ngOnInit() {
  }

  login(){
    if (!this.loginForm.valid){
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authservice.GetUserByUsername(username).subscribe(resp =>{
      this.userdata = resp;
      console.log(this.userdata);
      if (this.userdata.length === 0) {
        this.loginForm.reset();
        this.UsuarioNoExiste();
        return;
      }

      this.usuario={
        id: this.userdata[0].id,
        username: this.userdata[0].username,
        password: this.userdata[0].password,
        email:this.userdata[0].email,
      }
      if (this.usuario.password !== password) {
        this.loginForm.reset();
        this.ErrorUsuario(); 
        return;
      }
      this.IniciarSesion(this.usuario);
    })
 }

 private IniciarSesion(usuario: any) {
  sessionStorage.setItem('id', usuario.id.toString());
  sessionStorage.setItem('username', usuario.username);
  sessionStorage.setItem('password', usuario.password);
  sessionStorage.setItem('email', usuario.email);
  sessionStorage.setItem('ingresado', 'true');
  this.showToast('Sesión Iniciada ' + this.usuario.username);
  this.router.navigate(['/tabs/tab1']);
}

async showToast(msg: any){
  const toast= await this.toast.create({
    message:msg,
    duration: 3000
  })
  toast.present();
}

async ErrorUsuario(){
  const alerta = await this.alertcontroller.create({ 
    header : 'Error..',
    message : 'Revise sus credenciales',
    buttons : ['OK']
  })
  alerta.present();
}

async UsuarioNoExiste(){
  const alerta = await this.alertcontroller.create({ 
    header : 'No existe...',
    message : 'Debe registrarse..',
    buttons : ['OK']
  })
  alerta.present();
}

Registrar(){
  this.router.navigate(['/registro']);
}
}
