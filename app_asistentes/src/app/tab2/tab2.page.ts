import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { IEvent, IEvents } from '../interfaces/events';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  
  eventos: IEvents[] = [];

  constructor(private eventService: EventsService) {}

  ngOnInit() {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this.eventService.getEvents().subscribe((data: IEvents[]) => {
      this.eventos = data;
    });
  }
}
