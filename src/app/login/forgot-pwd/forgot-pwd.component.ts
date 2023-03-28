import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {
  showNotifyError,
  showSwalSuccess,
  showSwalWarning,
} from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss'],
})
export class ForgotPwdComponent implements OnInit {
  form!: FormGroup;

  constructor(private _ls: LoginService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  validateEmail(): void {
    this._ls.validateEmail(this.form.value.email).subscribe(
      (res: any[]) => {
        if (res.length === 0) {
          showSwalWarning(
            'Cuenta no encontrada',
            'No existe ninguna cuenta con el correo ingresado'
          );
          return;
        }
        if (res.length > 1) {
          showSwalWarning(
            'Error al validar email',
            ''
          );
          return;
        }
        if (res.length === 1) {
          let { email, _id } = res[0];
          this.sendEmail(email, _id.$oid);
          return;
        }
      },
      (e) => {
        showNotifyError('Error al validar el email', 'Intente mas tarde');
      }
    );
  }

  sendEmail(email: string, id: string): void {
    console.log('sendemail');

    this._ls.sendForgotEmail(email, id).subscribe(
      (res: any) => {
        showSwalSuccess(
          'Correo enviado',
          'Para continuar, ingrese al enlace que fue enviado a su correo electrónico'
        );
      },
      (e) => {
        showNotifyError('Error al enviar correo', 'Intente mas tarde');
      }
    );
  }
}
