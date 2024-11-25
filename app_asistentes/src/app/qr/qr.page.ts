import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  evento: any;
  id:any;
  qrdata:string;
  username:any;
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
  userdata:any;
  infoevento= {};
  
  constructor(private activated: ActivatedRoute, 
    private router: Router, private alertcontroller: AlertController, private auth:AuthService) {
      this.activated.queryParams.subscribe(param => {
        try {
          if (param['evento']) {
            this.evento = JSON.parse(param['evento']);
          } else {
            this.evento = {};  // Si el evento no viene, lo inicializas vacío
            console.error('No se ha proporcionado evento');
          }
        } catch (e) {
          console.error('Error al parsear el evento:', e);
        }
      });
      this.qrdata='';
      this.username= sessionStorage.getItem('username');
     }

  ngOnInit() {
    this.id = this.evento.id;
    this.generarQr();
    
  }


  generarQr() {
    this.auth.GetUserByUsername(this.username).subscribe(resp => {
      this.userdata = resp;
      this.usuario = {
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
  
 
      const qrJson = {
        evento: {
          id: this.evento.id,
          nombre: this.evento.nombre,
          fecha: this.evento.fecha,
          usuario: {
            id: this.usuario.id,
            rut: this.usuario.rut,
            email: this.usuario.email,
            nombre: this.usuario.pnombre,
            apellido: this.usuario.apellido
          }
        }
      };
  
      this.qrdata = JSON.stringify(qrJson);
      console.log('Datos para QR:', this.qrdata);
    });
  }
  
}
