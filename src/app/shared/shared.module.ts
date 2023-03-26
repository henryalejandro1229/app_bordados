import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material.module';
import { CarruselComponent } from './carrusel/carrusel.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CarruselComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MaterialModule,
    CarruselComponent,
  ],
})
export class SharedModule { }
