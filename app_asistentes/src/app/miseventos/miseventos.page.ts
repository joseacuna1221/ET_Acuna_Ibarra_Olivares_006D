import { Component, OnInit } from '@angular/core';
import { UserauthService } from '../services/userauth.service';
import { EventsService } from '../services/events.service';
import { Users } from '../interfaces/users';
import { IEvents } from '../interfaces/events';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-miseventos',
  templateUrl: './miseventos.page.html',
  styleUrls: ['./miseventos.page.scss'],
})
export class MiseventosPage implements OnInit {

  user!: Users;
  eventosInscritos: IEvents[] = [];

  constructor(
    private authService: UserauthService,
    private eventService: EventsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.authService.getLoggedUser().subscribe(user => {
      this.user = user;
      this.obtenerEventosInscritos();
    });
  }

  obtenerEventosInscritos() {
    this.eventService.getEvents().subscribe(eventos => {
      this.eventosInscritos = eventos.filter(evento => evento.participantes.includes(this.user.id.toString()));
    });
  }

  salirDelEvento(evento: IEvents) {
    evento.numeroParticipantes--;
    evento.participantes = evento.participantes.filter(id => id !== this.user.id.toString());
    this.eventService.updateEvent(evento).subscribe(() => {
      this.obtenerEventosInscritos();
    });
  }

  async agregarComentario(evento: IEvents) {
    const alert = await this.alertController.create({
      header: 'Dejar un Comentario',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título'
        },
        {
          name: 'puntaje',
          type: 'number',
          placeholder: 'Puntaje (0-5)',
          min: 0,
          max: 5
        },
        {
          name: 'cuerpo',
          type: 'textarea',
          placeholder: 'Comentario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const nuevoComentario = {
              titulo: data.titulo,
              puntaje: Number(data.puntaje),
              cuerpo: data.cuerpo
            };
            evento.comentarios.push(nuevoComentario);
            this.eventService.updateEvent(evento).subscribe(() => {
              this.obtenerEventosInscritos(); // Actualizar la lista
            });
          }
        }
      ]
    });

    await alert.present();
  }

  verQR(evento: IEvents) {
  }
}
