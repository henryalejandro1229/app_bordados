import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private readonly http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http
      .get(`${environment.url}/users/read.php`);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${environment.url}/users/login.php?email=${email}&password=${password}`;
    return this.http.get(url);
  }

  singup(email: string): Observable<any> {
    const url = `${environment.url}/users/create.php?email=${email}`;
    return this.http.get(url);
  }
  
  // nuevoAreaEnvio(obj: AreaEnvioModel): Observable<RespuestaModelo> {
  //   const url = `${environment.urlEntregas}/tipo_envio`;
  //   return this.http.post<RespuestaModelo>(url, obj);
  // }
  // actualizaAreaEnvio(obj: AreaEnvioModel): Observable<RespuestaModelo> {
  //   const url = `${environment.urlEntregas}/tipo_envio/${obj.ID}`;
  //   return this.http.put<RespuestaModelo>(url, obj);
  // }
  // eliminaAreaEnvio(id: string): Observable<RespuestaModelo> {
  //   const url = `${environment.urlEntregas}/tipo_envio/${id}`;
  //   return this.http.delete<RespuestaModelo>(url);
  // }
}
