import { ToastController } from '@ionic/angular';
import { AlertController,MenuController}  from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';


interface Menu{
  icon:string;
  redirecTo:string;
  name:string;
}


register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu:Menu[]=[
    {
      icon:'planet-outline',
      redirecTo: '/tabs/tab2',
      name: 'Proximos eventos'
    },
    {
      icon:'calendar-number-outline',
      redirecTo: '/tabs/tab3',
      name: 'Mis eventos'
    },
    {
      icon:'walk-outline',
      redirecTo: '/tabs/tab1',
      name: 'Mi perfil'
    },
    {
      icon:'paw-outline',
      redirecTo: '/tabs/tab2',
      name: 'Acerca de Duoc'
    },
    {
      icon:'settings-outline',
      redirecTo: '/tabs/tab2',
      name: 'Configuracion'
    },
  ]

  constructor(private router: Router,
    private alertcontroller:AlertController,
    private toast: ToastController,
    private menuC:MenuController) {}

    logOut(){
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('password');
      sessionStorage.removeItem('ingresado');
      this.menuC.close();
      this.router.navigateByUrl('/inicio')
      this.showToast('Hasta pronto...');
    }
  
    async showToast(msg: any){
      const toast= await this.toast.create({
        message:msg,
        duration: 3000
      })
      toast.present();
    }
  }