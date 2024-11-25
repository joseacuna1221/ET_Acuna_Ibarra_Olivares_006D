import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvento, IEventos } from 'src/interfaces/IEventos';
import { environment } from 'src/environments/environment';
import { IQREvento } from 'src/interfaces/IQR';

@Injectable({
  providedIn: 'root'
})
export class ApicrudeventosService {

  constructor(private httpclient: HttpClient) { }

  getEventos(): Observable<IEventos[]> {
    return this.httpclient.get<IEventos[]>(`${environment.apiUrl}/eventos`);
  }

  getEventoById(eventoId: string): Observable<IEventos> {
    return this.httpclient.get<IEventos>(`${environment.apiUrl}/eventos/${eventoId}`);
  }

  postEventos(newEvento: IEvento): Observable<IEvento> {
    return this.httpclient.post<IEvento>(`${environment.apiUrl}/eventos`, newEvento);
  }

  putEventos(evento: any): Observable<IEventos> {
    return this.httpclient.put<IEventos>(`${environment.apiUrl}/eventos/${evento.id}`, evento);
  }

  putAsistente(eventoId: string, asistente: { username: string; estado: string }) {
    const url = `${environment.apiUrl}/eventos/${eventoId}/asistentes/${asistente.username}`;
  }
  

  deleteEventos(evento: any): Observable<IEventos> {
    return this.httpclient.delete<IEventos>(`${environment.apiUrl}/eventos/${evento.id}`);
  }

  putQR(qrData: IQREvento): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiUrl}/QR`, qrData); // Usamos POST en lugar de PUT para crear el nuevo QR
  }

  getAsistentes(eventoId: string): Observable<any> {
    return this.httpclient.get(`${environment.apiUrl}/${eventoId}/asistentes`);
  }
  
  
}
