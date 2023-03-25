import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          breadcrumb: 'Bordados'
        }
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(mod => mod.AdminModule),
        // canLoad: [PermisoModuloGuard],
        data: {
          nombre: 'Administrador',
          breadcrumb: 'Administrador'
        }
      },
      // {
      //   path: 'envios',
      //   loadChildren: '../envios/envios.module#EnviosModule',
      //   //TODO: Revisar y activar
      //   /* canLoad: [PermisoModuloGuard], */
      //   data: {
      //     nombre: 'Envios',
      //     breadcrumb: 'Envíos a domicilio'
      //   }
      // },
      // {
      //   path: 'migraciones',
      //   loadChildren: '../migraciones/migraciones.module#MigracionesModule',
      //   // canLoad: [PermisoModuloGuard],
      //   data: {
      //     nombre: 'Migraciones',
      //     breadcrumb: 'Migraciones'
      //   }
      // }
    ],
    // canActivate: [
    //   AuthGuardService
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
