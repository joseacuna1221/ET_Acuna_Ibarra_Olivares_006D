import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser, Users } from 'src/interfaces/users';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  GetAllUsers():Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  GetUserByUsername(usuario:any):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?username=${usuario}`);
  }

  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  PostUsuario(newUsuario:NewUser): Observable<NewUser>{
    return this.httpclient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }
  
  GetUsuarioId(id:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  PutUsuario(usuario:any):Observable<Users>{
    return this.httpclient.put<Users>(`${environment.apiUrl}/usuarios/${usuario.id}`,usuario);
  }

  recoverPassword(email: string): Observable<any> {
    return this.httpclient.post(`${environment.apiUrl}/recover-password`, { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.httpclient.post(`${environment.apiUrl}/reset-password`, {
      token,
      newPassword,
    });
  }
  
}