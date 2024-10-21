import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, User } from '../interfaces/users';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {


  constructor(private httpclient: HttpClient) { }

  GetAllUsers():Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  GetUserByUsername(usuario:any):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?username=${usuario}`);
  }

  GetUserById(id: number): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/${id}`);
  }

  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  PostUsuario(newUsuario:User): Observable<User>{
    return this.httpclient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }
  
  GetUsuarioId(id:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  register(userData: any): Observable<any> {
    return this.httpclient.post(`${environment.apiUrl}/usuarios/`, userData);
  }

  getLoggedUser(): Observable<Users> {
    const userId = sessionStorage.getItem('id');
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/${userId}`);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.httpclient.put<any>(`${environment.apiUrl}/usuarios/${id}`, userData);
  } 

  logout() {
    sessionStorage.clear();
  }
  
}
