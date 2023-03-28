import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getTokenLocalStorage() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  setTokenLocalStorage(token: string) {
    return localStorage.setItem('token', token);
  }

  isAuth(): boolean {
    let token = this.getTokenLocalStorage();
    if (token && token?.length > 0) {
      return true;
    }
    return false;
  }

  logout() {
    return localStorage.removeItem('token');
  }
}
