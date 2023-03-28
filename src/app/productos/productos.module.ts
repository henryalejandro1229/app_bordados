import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductosRoutingModule } from './productos-routing.module';
import { ListCategoriesComponent } from './pages/list-categories/list-categories.component';



@NgModule({
  declarations: [
    ProductosComponent,
    ListProductsComponent,
    DetailProductComponent,
    ListCategoriesComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule,
  ],
  exports: [
    ListProductsComponent,
    DetailProductComponent,
    ListCategoriesComponent,
  ]
})
export class ProductosModule { }
