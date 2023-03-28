import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material.module';
import { CarruselComponent } from './carrusel/carrusel.component';
import { HttpClientModule } from '@angular/common/http';
import { AvisoPrivacidadComponent } from './aviso-privacidad/aviso-privacidad.component';
import { MisionVisionComponent } from './mision-vision/mision-vision.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CarruselComponent,
    AvisoPrivacidadComponent,
    MisionVisionComponent,
    PreguntasFrecuentesComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
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
    CarruselComponent,
    AvisoPrivacidadComponent,
    MisionVisionComponent,
    PreguntasFrecuentesComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedModule { }
