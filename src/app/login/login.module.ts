import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPwdComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForgotPwdComponent
  ]
})
export class LoginModule { }
