import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata:any;
  usuario={
    id: "",
    username:"",
    email:"",
    pnombre:"",
    apellido:"",
    carrera:"",
    password:"",
    isactive: false
  }

  loginForm:FormGroup;

  constructor(private authservice:AuthService, private router:Router, private toast: ToastController,
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
        email:this.userdata[0].email,
        pnombre:this.userdata[0].pnombre,
        apellido:this.userdata[0].apellido,
        carrera:this.userdata[0].carrera,
        password: this.userdata[0].password,
        isactive: this.userdata[0].isactive
      }
      if (this.usuario.password !== password) {
        const username = this.loginForm.value.username;
        this.loginForm.reset();
        this.loginForm.controls['username'].setValue(username);
        this.ErrorUsuario(); 
        return;
      }
      if (!this.usuario.isactive) {
        this.loginForm.reset();
        this.UsuarioInactivo();
        return;
      }
      this.IniciarSesion(this.usuario);
    })
 }


  private IniciarSesion(usuario:any){
    sessionStorage.setItem('username', usuario.username);
    sessionStorage.setItem('password', usuario.password);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada '+ this.usuario.username);
    this.router.navigate(['/tabs/tab2']);

  }

  
  async showToast(msg: any){
    const toast= await this.toast.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }

  
  async UsuarioInactivo(){
    const alerta = await this.alertcontroller.create({ 
      header : 'Usuario inactivo',
      message : 'Contactar a admin@admin.cl',
      buttons : ['OK']
    })
    alerta.present();
  }

  
async ErrorUsuario(){
  const alerta = await this.alertcontroller.create({ 
    header : 'Contraseña incorrecta',
    message : 'Intente nuevamente',
    buttons : ['OK']
  })
  alerta.present();
}

async UsuarioNoExiste(){
  const alerta = await this.alertcontroller.create({ 
    header : 'Usuario no existe',
    message : 'Porfavor cree una cuenta',
    buttons : ['OK']
  })
  alerta.present();
}

Registrar(){
  this.router.navigate(['/register']);
}


}
