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
    console.log(environment.url)
    return this.http
      .get(`${environment.url}/users/read.php`);
  }
  // getOneAreaEnvio(id: string): Observable<RespuestaModelo> {
  //   const url = `${environment.urlEntregas}/tipo_envio/${id}`;
  //   return this.http.get<RespuestaModelo>(url);
  // }
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

export interface RespuestaModelo {
  Mensaje: string;
  Data: any;
  Codigo: number;
}
