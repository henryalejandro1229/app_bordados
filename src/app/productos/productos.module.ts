import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductosRoutingModule } from './productos-routing.module';



@NgModule({
  declarations: [
    ProductosComponent,
    ListProductsComponent,
    DetailProductComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule,
  ],
  exports: [
    ListProductsComponent,
    DetailProductComponent,
  ]
})
export class ProductosModule { }
