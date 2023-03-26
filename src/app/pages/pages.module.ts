import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from '../home/pages/products-list/products-list.component';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProductsListComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
  ], 
  exports: [
    HomeComponent,
    ProductsListComponent,
  ]
})
export class PagesModule { }
