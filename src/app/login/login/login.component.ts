import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { showNotifyError, showNotifySuccess, showNotifyWarning } from 'src/app/shared/functions/Utilities';

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
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.form.valid) {
      this.sending = true;
      this._loginService
        .login(this.form.value.email, this.form.value.password)
        .subscribe(
          (res : any[]) => {
            if(res.length > 0) {
              showNotifySuccess('Bienvenido', '');
              this._router.navigate(['/home']);
            } else {
              showNotifyWarning('Email o contraseña incorrectos', 'Verifica tus datos')
            }
            // this._loginService.setUserRepartidorInLocalStorage(this.form.value.usuario);
          },
          (e) => {
            showNotifyError('Error al iniciar sesión', 'Intente mas tarde');
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
