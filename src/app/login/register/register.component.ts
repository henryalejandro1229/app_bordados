import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(private _ls: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  register(): void {
    console.log(this.formLogin);
    console.log(this.formLogin.valid);

    if (this.formLogin.valid) {
      this._ls.singup(this.formLogin.value.email).subscribe(
        (res: any) => {
          this.router.navigate(['/home']);
          // if (d) {
          //   this.Notificacion.duration = 500;
          //   this.Notificacion.showNotification('Sesion iniciada', 'success');
          // }
        },
        (e) => {
          catchError(e);
        }
      );
    }
  }
}
