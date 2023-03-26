import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material.module';
import { CarruselComponent } from './carrusel/carrusel.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CarruselComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MaterialModule,
    CarruselComponent,
    HttpClientModule,
  ],
})
export class SharedModule { }
