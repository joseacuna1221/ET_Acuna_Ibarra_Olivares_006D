import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvento, IEventos } from 'src/interfaces/IEventos';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient) { }

  getEventos():Observable<IEventos[]>{
    return this.httpclient.get<IEventos[]>(`${environment.apiUrl}/eventos`);
  }

  // postEventos(newEvento:IEvento):Observable<IEvento>{
  //   return this.httpclient.post<IEvento>(`${environment.apiUrl}/eventos`,newEvento);
  // }

  putEventos(evento: any):Observable<IEventos>{
    return this.httpclient.put<IEventos>(`${environment.apiUrl}/eventos/${evento.id}`,evento);
  }

  deleteEventos(evento:any): Observable<IEventos>{
    return this.httpclient.delete<IEventos>(`${environment.apiUrl}/eventos/${evento.id}`);
  }

  getEventosByUsername(username: string): Observable<IEventos[]> {
    return this.httpclient.get<IEventos[]>(`${environment.apiUrl}/eventos`).pipe(
      map(eventos => eventos.filter(evento => 
        evento.asistentes.some(asistentes => asistentes.username === username)
      ))
    );
  }

  getEventoById(id: string): Observable<IEvento | null> {
    return this.httpclient.get<IEvento>(`${environment.apiUrl}/eventos/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener el evento:', error);
        return of(null); 
      })
    );
  }
}