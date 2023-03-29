import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPwdComponent } from './login/forgot-pwd/forgot-pwd.component';
import { MisionVisionComponent } from './shared/mision-vision/mision-vision.component';
import { AvisoPrivacidadComponent } from './shared/aviso-privacidad/aviso-privacidad.component';
import { PreguntasFrecuentesComponent } from './shared/preguntas-frecuentes/preguntas-frecuentes.component';
import { RegisterProcessComponent } from './login/register-process/register-process.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { PedidosComponent } from './shared/pedidos/pedidos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: RegisterComponent },
  { path: 'forgot-pwd', component: ForgotPwdComponent },
  { path: 'singup-process', component: RegisterProcessComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'mision-vision', component: MisionVisionComponent },
  { path: 'aviso-privacidad', component: AvisoPrivacidadComponent },
  { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
  { path: 'pedidos', component: PedidosComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/pages.module').then((mod) => mod.PagesModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
