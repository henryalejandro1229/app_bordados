import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { showModalConfirmation, showNotifySuccess } from '../functions/Utilities';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuth = false;
  isAdmin = false;
  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.verifiedAuth();
  }

  public routerLink(path: string): void {
    this.router.navigate([path]);
  }

  logout() {
    showModalConfirmation('Cerrar sesión', '¿Seguro que deseas cerrar sesión?').then(res => {
      if (res) {
        this._auth.logout();
        this.verifiedAuth();
        showNotifySuccess('Se cerró sesión correctamente', '');
      }
    })
  }

  verifiedAuth(): void {
    this.isAuth = this._auth.isAuth();
    this.isAdmin = this._auth.isAdmin();
  }
}
