import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPwdComponent } from './login/forgot-pwd/forgot-pwd.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: RegisterComponent },
  { path: 'forgot-pwd', component: ForgotPwdComponent },
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
