import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  clear: boolean = false;
  sending = false;
  fecha = new Date();
  passwordTyping = false;
  usuarioTyping = false;

  constructor(
    private readonly _loginService: LoginService,
    private readonly _router: Router
  ) {
    this.form = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  login() {
    // (<any>Object).values((<FormGroup>this.form).controls).forEach(campo => {
    //   campo.markAsTouched();
    // });
    if (this.form.valid) {
      // showLoader(true);
      this.sending = true;
      this._loginService
        .login(this.form.value.usuario, this.form.value.password)
        .subscribe(
          (res : any[]) => {
            if(res.length > 0) {
              this._router.navigate(['/home']);
            } else {
            }
            // showLoader(false);
            // this._loginService.setUserRepartidorInLocalStorage(this.form.value.usuario);
            // this.sending = false;
            // if (d) {
            //   this.Notificacion.duration = 500;
            //   this.Notificacion.showNotification('Sesion iniciada', 'success');
            // }
          },
          (e) => {
            // this.sending = false;
            catchError(e);
          }
        );
    }
  }

  resolved(data: any) {
    if (data) {
      this.login();
    }
  }
}
