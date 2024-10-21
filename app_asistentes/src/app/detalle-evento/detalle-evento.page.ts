import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvents } from '../interfaces/events';
import { EventsService } from '../services/events.service';
import { AlertController } from '@ionic/angular';
import { UserauthService } from '../services/userauth.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.page.html',
  styleUrls: ['./detalle-evento.page.scss'],
})
export class DetalleEventoPage implements OnInit {

  evento!: IEvents;
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private router: Router,
    private alertController: AlertController,
    private authService: UserauthService
  ) {}

  ngOnInit() {
    this.obtenerEvento();
    this.obtenerUsuario();
  }

  obtenerEvento() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe(
        evento => {
          this.evento = evento; 
        }
      );
    }
  }

  obtenerUsuario() {
    this.authService.getLoggedUser().subscribe((user: Users) => {
      this.userId = user.id.toString();
    });
  }

  unirseComoParticipante() {
    if (this.evento) {
      if (this.evento.participantes && this.evento.participantes.includes(this.userId)) {
        this.mensajeError('Ya estás inscrito como participante en este evento.');
        return;
      }

      if (this.evento.numeroParticipantes < this.evento.maxParticipantes) {
        this.evento.numeroParticipantes++;
        if (!this.evento.participantes) {
          this.evento.participantes = [];
        }
        this.evento.participantes.push(this.userId);
        this.eventService.updateEvent(this.evento).subscribe(() => {
          this.mensaje(`Te has unido como participante a ${this.evento.nombre}.`, `Participantes actuales: ${this.evento.numeroParticipantes}`);
          this.router.navigate(['/tabs/tab2']);
        });
      } else {
        this.mensajeError('No se puede unir. El evento ya está lleno.');
      }
    }
  }

  unirseComoEspectador() {
    if (this.evento) {
      if (this.evento.numeroEspectadores < this.evento.maxEspectadores) {
        if (!this.evento.espectadores) {
          this.evento.espectadores = []; // Inicializa el arreglo si no existe
        }

        // Verificamos si el usuario ya es espectador
        if (this.evento.espectadores.includes(this.userId)) {
          this.mensajeError('Ya estás inscrito como espectador en este evento.');
          return;
        }

        this.evento.numeroEspectadores++;
        this.evento.espectadores.push(this.userId);
        this.eventService.updateEvent(this.evento).subscribe(() => {
          this.mensaje(`Te has unido como espectador a ${this.evento.nombre}.`, `Espectadores actuales: ${this.evento.numeroEspectadores}`);
        });
      } else {
        this.mensajeError('No se puede unir. El evento ya está lleno de espectadores.');
      }
    }
  }
  
  async mensaje(header: string, message: string) {
    const alerta = await this.alertController.create({ 
      header: header,
      message: message,
      buttons: ['OK']
    });
    alerta.present();
  }

  async mensajeError(message: string) {
    const alerta = await this.alertController.create({ 
      header: `Error`,
      message: message,
      buttons: ['OK']
    });
    alerta.present();
  }
}
