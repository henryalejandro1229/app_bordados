import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

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

  constructor(private readonly _loginService: LoginService) {
    this.form = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._loginService.getUsuarios().subscribe((data) => {
      console.log(data);
    });
  }

  login() {
    // (<any>Object).values((<FormGroup>this.form).controls).forEach(campo => {
    //   campo.markAsTouched();
    // });
    // if (this.form.valid) {
    //   showLoader(true);
    //   this.sending = true;
    //   this._loginService.login(this.form.value.usuario, this.form.value.password)
    //     .subscribe((d: boolean) => {
    //         showLoader(false);
    //         this._loginService.setUserRepartidorInLocalStorage(this.form.value.usuario);
    //         this.sending = false;
    //         this._router.navigate(['/app']);
    //         if (d) {
    //           this.Notificacion.duration = 500;
    //           this.Notificacion.showNotification('Sesion iniciada', 'success');
    //         }
    //       },
    //       e => {
    //         this.captchaRef.reset();
    //         this.sending = false;
    //         catchError(e);
    //       });
    // }
  }

  submit() {
    // const usuario = this.form.value.usuario;
    // const checkRepartidor = this._loginService.checkUserRepartidorInLocalStorage(usuario);
    // if (environment.modoOnline) {
    //   return checkRepartidor ? this.login() : this.captchaRef.execute();
    // } else {
    //   this.login();
    // }
  }

  resolved(data: any) {
    if (data) {
      this.login();
    }
  }
}
