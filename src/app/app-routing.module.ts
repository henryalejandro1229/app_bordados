import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'app',
    loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule),
    // canLoad: [
    //   AuthGuardService
    // ],
    data: {
      breadcrumb: 'Bordados'
    },
    // canActivate: [AuthGuardService]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
