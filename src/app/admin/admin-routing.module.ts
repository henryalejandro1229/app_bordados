import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        data: { breadcrumb: 'Dashboard' },
        component: HomeAdminComponent
      },
      {
        path: 'products',
        data: { breadcrumb: 'Productos' },
        component: ProductsComponent
      },
      {
        path: 'categories',
        data: { breadcrumb: 'Categorías' },
        component: CategoriesComponent
      },
      {
        path: 'users',
        data: { breadcrumb: 'Usuarios' },
        component: UsersComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
