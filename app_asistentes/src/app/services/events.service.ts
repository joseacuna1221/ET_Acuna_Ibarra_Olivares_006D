import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvents } from '../interfaces/events';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private httpclient: HttpClient) {}

  getEvents(): Observable<IEvents[]> {
    return this.httpclient.get<IEvents[]>(`${environment.apiUrl}/eventos`);
  }

  getEventById(id: string): Observable<IEvents> {
    return this.httpclient.get<IEvents>(`${environment.apiUrl}/eventos/${id}`);
  }

  updateEvent(event: IEvents): Observable<IEvents> {
    return this.httpclient.put<IEvents>(`${environment.apiUrl}/eventos/${event.id}`, event);
  }
}
