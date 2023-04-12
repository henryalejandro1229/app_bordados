import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {
  showNotifyError,
  showSwalSuccess,
  showSwalWarning,
} from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(private _ls: LoginService) {}

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  register(): void {
    if (this.formRegister.valid) {
      this._ls.singup(this.formRegister.value.email).subscribe(
        (res: any) => {
          this.validateEmail(true);
        },
        (e) => {
          showNotifyError('Error al registrar', 'Intente mas tarde');
        }
      );
    }
  }

  validateEmail(sendEmail = false): void {
    this._ls.validateEmail(this.formRegister.value.email).subscribe(
      (res: any[]) => {
        if (res.length === 1) {
          let { email, _id } = res[0];
          sendEmail ? this.sendEmail(email, _id.$oid) : this.register();
          return;
        }
        if (res.length > 0) {
          console.log(res[0]._id.$oid);
          showSwalWarning(
            'Correo existente',
            'Ya existe una cuenta con el correo ingresado'
          );
          return;
        }
        this.register();
      },
      (e) => {
        showNotifyError('Error al validar el email', 'Intente mas tarde');
      }
    );
  }

  sendEmail(email: string, id: string): void {
    console.log('sendemail');
    
    this._ls.sendValidateEmail(email, id).subscribe(
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
