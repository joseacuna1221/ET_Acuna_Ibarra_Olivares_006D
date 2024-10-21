import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from '../services/userauth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './Tab4.Page.html',
  styleUrls: ['./Tab4.Page.scss'],
})
export class Tab4Page implements OnInit {

  user: any = null;

  constructor(private authService: UserauthService, private router: Router,private menucontroller:MenuController) { }

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario() {
    this.authService.getLoggedUser().subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/start']);
  }

  mostrarMenu(){
    this.menucontroller.enable(true);
    this.menucontroller.open('first');
  }
}
