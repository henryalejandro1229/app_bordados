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
    return this.http.get(`${environment.url}/users/read.php`);
  }

  validateEmail(email: string): Observable<any> {
    return this.http.get(
      `${environment.url}/users/read_single.php?email=${email}`
    );
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(`${environment.url}/users/getUser.php?id=${id}`);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${environment.url}/users/login.php?email=${email}&password=${password}`;
    return this.http.get(url);
  }

  singupAll(id: string, name: string, password: string): Observable<any> {
    const url = `${environment.url}/users/singupAll.php?id=${id}&name=${name}&password=${password}`;
    return this.http.get(url);
  }

  singup(email: string): Observable<any> {
    const url = `${environment.url}/users/create.php?email=${email}`;
    return this.http.get(url);
  }

  updatePwd(id: string, password: string): Observable<any> {
    const url = `${environment.url}/users/update_password.php?id=${id}&password=${password}`;
    return this.http.get(url);
  }

  sendValidateEmail(email: string, id: string): Observable<any> {
    let body = {
      email,
      id,
    };
    const url = `${environment.urlEmail}/send-validate-email`;
    return this.http.post(url, body);
  }

  sendForgotEmail(email: string, id: string): Observable<any> {
    let body = {
      email,
      id,
    };
    const url = `${environment.urlEmail}/send-forgot-password`;
    return this.http.post(url, body);
  }
}
