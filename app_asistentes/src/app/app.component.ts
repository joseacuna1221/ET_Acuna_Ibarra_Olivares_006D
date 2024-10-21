import { Component } from '@angular/core';
import { UserauthService } from './services/userauth.service';
import { Router } from '@angular/router';

interface Menu{
  icon:string;
  name:string;
  action?: () => void;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu:Menu[]=[
    {
      icon:'sparkles-outline',
      name:'editar perfil',
      action: () => this.router.navigate(['/editar-perfil']),
    },
    {
      icon:'person-circle-outline',
      name:'mis eventos',
      action: () => this.router.navigate(['/miseventos']),
    },
    {
      icon:'paw-outline',
      name:'cerrar sesion',
      action: () => this.cerrarSesion(),
    },
  ]
  constructor(private router: Router, private authService: UserauthService) {}

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/start']);}
}
