import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductosComponent,
    children: [
      {
        path: '',
        component: ListProductsComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
