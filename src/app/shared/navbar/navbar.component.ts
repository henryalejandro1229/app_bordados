import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalCerrarSesionComponent } from '../modal-cerrar-sesion/modal-cerrar-sesion.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private matDialog: MatDialog,) {}

  ngOnInit(): void {}

  public routerLink(path: string): void {
    this.router.navigate([path]);
  }

   logout() {
    this.matDialog.open(ModalCerrarSesionComponent,
      {
        // panelClass: 'sinpadding',
        width: '500px',
        height: 'auto',
      }).afterClosed().subscribe(data => {
          // if (data) {
          //   this.actualizaConfiguracion(data, dataConfig.ID);
          // }
        }
      );
  }
}
